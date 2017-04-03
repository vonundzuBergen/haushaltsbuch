import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Kategorie } from './kategorie';
import { KategorienController } from './kategorien.controller';
import { Transaktion } from './transaktion';
import { TransaktionenController } from './transaktionen.controller';
import { NeueTransaktionModalService } from './neue-transaktion-modal.service';
import { WiederkehrendeTransaktion } from './wiederkehrende-transaktion';
import { WiederkehrendeTransaktionenController } from './wiederkehrende-transaktionen.controller';
declare var $: any;

@Component({
    selector: 'neue-transaktion-modal',
    templateUrl: '/app/neue-transaktion-modal.component.html',
    styleUrls: ['./app/neue-transaktion-modal.component.css']
})
export class NeueTransaktionModalComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    private kategorien: Array<Kategorie>;
    private kategorienControllerSubscription: Subscription;
    private transaktionenControllerSubscription: Subscription
    private transaktionSubscription: Subscription;
    private wiederkehrendeTransaktionSubscription: Subscription;
    private currentDateObject: any;
    private myStartDatePickerOptions: IMyOptions;
    private myEndDatePickerOptions: IMyOptions;
    private selectedKategorie: string;
    private hasEndDatum: Boolean;

    //Variables that are used to capture the ids of updated transaktions
    private updatedTransaktion: Transaktion;
    private updatedZukuenftigeTransaktion: WiederkehrendeTransaktion;

    //Flags for determining which fields are shown on modal
    private isUpdateTransaktion: Boolean;
    private isUpdateZukuenftigeTransaktion: boolean;
    private isZukuenftigeZahlung: boolean;
    private isWiederkehrendeZahlung: boolean;

    private transaktionsTypen = [
        'Einnahme',
        'Ausgabe'
    ];
    private selectedTransaktionsTyp: string;
    private selectedTransaktionsHaeufigkeit: string;

    private transaktionsHaeufigkeiten = [
        'Einmalig',
        'Täglich',
        'Wöchentlich',
        'Monatlich'
    ];

    constructor(private _wiederkehrendeTransaktionenController: WiederkehrendeTransaktionenController, private _transaktionenController: TransaktionenController, private _kategorienController: KategorienController, private _fb: FormBuilder, private _neueTransaktionModalService: NeueTransaktionModalService) {

        this.isUpdateTransaktion = false;
        this.isUpdateZukuenftigeTransaktion = false;
        this.isZukuenftigeZahlung = false;
        this.isWiederkehrendeZahlung = false;

        this.kategorien = new Array<Kategorie>();
        this.selectedTransaktionsTyp = this.transaktionsTypen[0];
        this.selectedTransaktionsHaeufigkeit = this.transaktionsHaeufigkeiten[0];
        this.hasEndDatum = false;

        let currentDate = new Date();
        this.currentDateObject = {
            date: {
                year: currentDate.getFullYear(),
                month: currentDate.getMonth() + 1,
                day: currentDate.getDate()
            }
        };

        this.myStartDatePickerOptions = {
            inline: false,
            editableDateField: false,
            showClearDateBtn: false,
            showTodayBtn: true,
            markCurrentDay: true,
            dateFormat: 'dd mmm yyyy',
        };

        this.myEndDatePickerOptions = {
            inline: false,
            editableDateField: false,
            showClearDateBtn: false,
            dateFormat: 'dd mmm yyyy',
            disableUntil: { year: this.currentDateObject.date.year, month: this.currentDateObject.date.month, day: this.currentDateObject.date.day }
        };

        this.transaktionSubscription = this._neueTransaktionModalService.transaktion$.subscribe(
            transaktion => this.populateFormWithTransaktion(transaktion)
        );

        this.wiederkehrendeTransaktionSubscription = this._neueTransaktionModalService.wiederkehrendeTransaktion$.subscribe(
            transaktion => this.populateFormWithZukuenftigeTransaktion(transaktion)
        );

        let betragRegex = /^\d+((,|.)\d{1,2})?$/;
        let beschreibungRegex = /^[a-z\d\-_,.\s]+$/i;

        this.form = this._fb.group({
            transaktionsTyp: [''],
            betrag: ['', [Validators.required, Validators.pattern(betragRegex)]],
            kategorie: [''],
            beschreibung: ['', [Validators.required, Validators.pattern(beschreibungRegex)]],
            transaktionsHaeufigkeit: ['Einmalig'],
            startDatum: [this.currentDateObject],
            hasEndDatum: [false],
            endDatum: ['',]
        });

        this.kategorienControllerSubscription = this._kategorienController.kategorien$.subscribe(
            kategorien => {
                this.kategorien = kategorien;
                if (this.kategorien.length > 0) {
                    this.form.controls['kategorie'].setValue(this.kategorien[0].Name);
                }
            }
        );
    }

    ngOnInit(): void {
        var self = this;
        $(document).ready(function () {
            $("#neueTransaktionModal").on('hidden.bs.modal', () => self.clearForm())
        });
    }

    ngOnDestroy() {
        this.transaktionSubscription.unsubscribe();
        this.kategorienControllerSubscription.unsubscribe();
        this.transaktionenControllerSubscription.unsubscribe();
        this.wiederkehrendeTransaktionSubscription.unsubscribe();
    }

    private populateFormWithTransaktion(transaktion: Transaktion) {

        this.isZukuenftigeZahlung = false;
        this.isUpdateZukuenftigeTransaktion = false;
        this.isUpdateTransaktion = true;

        this.updatedTransaktion = transaktion;

        this.selectedTransaktionsTyp = transaktion.IsEinnahme ? 'Einnahme' : 'Ausgabe';
        this.form.controls['betrag'].setValue(transaktion.Betrag.toString());

        let kategorieIndex = this.kategorien.findIndex(x => x.KategorieId == transaktion.KategorieId);
        let kategorie = this.kategorien[kategorieIndex];

        this.form.controls['kategorie'].setValue(kategorie.Name);
        this.form.controls['beschreibung'].setValue(transaktion.Beschreibung);
        this.form.controls['transaktionsHaeufigkeit'].setValue(this.transaktionsHaeufigkeiten[0]);
        this.form.controls['startDatum'].setValue({ date: { year: transaktion.Datum.getFullYear(), month: transaktion.Datum.getMonth() + 1, day: transaktion.Datum.getDate() } });
        this.form.markAsTouched();
    }

    private populateFormWithZukuenftigeTransaktion(transaktion: WiederkehrendeTransaktion) {

        this.isZukuenftigeZahlung = true;
        this.isUpdateTransaktion = false;
        this.isUpdateZukuenftigeTransaktion = true;

        this.updatedZukuenftigeTransaktion = transaktion;

        this.selectedTransaktionsTyp = transaktion.IsEinnahme ? 'Einnahme' : 'Ausgabe';
        this.form.controls['betrag'].setValue(transaktion.Betrag.toString());

        let kategorieIndex = this.kategorien.findIndex(x => x.KategorieId == transaktion.KategorieId);
        let kategorie = this.kategorien[kategorieIndex];
        this.form.controls['kategorie'].setValue(kategorie.Name);

        this.form.controls['beschreibung'].setValue(transaktion.Beschreibung);
        this.form.controls['transaktionsHaeufigkeit'].setValue(this.transaktionsHaeufigkeiten[transaktion.Frequenz]);
        this.form.controls['transaktionsHaeufigkeit'].disable();

        this.form.controls['startDatum'].setValue({ date: { year: transaktion.StartDatum.getFullYear(), month: transaktion.StartDatum.getMonth() + 1, day: transaktion.StartDatum.getDate() } });

        let date = new Date('01/01/2000');

        if (transaktion.EndDatum.getFullYear() == date.getFullYear()) {
            this.hasEndDatum = false;
        } else {
            this.hasEndDatum = true;
            this.form.controls['endDatum'].setValue({ date: { year: transaktion.EndDatum.getFullYear(), month: transaktion.EndDatum.getMonth() + 1, day: transaktion.EndDatum.getDate() } });
            console.log("hasEndDatum: " + this.hasEndDatum);
        }

        this.onTransaktionsHaeufigkeitChange(this.form.controls['transaktionsHaeufigkeit'].value);
        this.form.controls['endDatum'].setValue({ date: { year: transaktion.EndDatum.getFullYear(), month: transaktion.EndDatum.getMonth() + 1, day: transaktion.EndDatum.getDate() } });
    }

    clearForm() {
        console.log("in clearForm");
        this.selectedTransaktionsTyp = 'Einnahme';
        this.form.controls['betrag'].reset();
        if (this.kategorien.length > 0) {
            this.form.controls['kategorie'].setValue(this.kategorien[0].Name);
        }
        this.form.controls['beschreibung'].reset();
        this.form.controls['transaktionsHaeufigkeit'].setValue(this.transaktionsHaeufigkeiten[0]);

        this.onTransaktionsHaeufigkeitChange(this.form.controls['transaktionsHaeufigkeit'].value);

        this.form.controls['startDatum'].setValue(this.currentDateObject);
        this.SetIsZukuenftigeZahlung(this.currentDateObject);

        this.isUpdateZukuenftigeTransaktion = false;
        this.isUpdateTransaktion = false;
        this.form.controls['transaktionsHaeufigkeit'].enable();
        this.hasEndDatum = false;
    }

    onFocusOut() {
        console.log("onFocusOut");
    }

    onTransaktionsTypSelectionChange(typ: string) {
        this.selectedTransaktionsTyp = typ;
        console.log(this.selectedTransaktionsTyp);
    }

    onTransaktionsHaeufigkeitChange(h: string) {
        this.selectedTransaktionsHaeufigkeit = h;

        if (h == 'Einmalig') {
            this.isWiederkehrendeZahlung = false;
            this.hasEndDatum = false;
        }
        else {
            this.isWiederkehrendeZahlung = true;
        }

        let startDatum = this.form.controls['startDatum'].value.date;
        let startDatumAsDate = new Date(startDatum.year, startDatum.month - 1, startDatum.day);
        this.SetDatePickerOptions(startDatumAsDate, h, false);
    }

    // dateChanged callback function called when the user select the date. This is mandatory callback
    // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.

    private SetIsZukuenftigeZahlung(startDate: Date) {
        let dayNow = new Date().getDate();
        let monthNow = new Date().getMonth();
        let yearNow = new Date().getFullYear();
        let dateNow = new Date(yearNow, monthNow, dayNow);

        if (startDate > dateNow) {
            this.isZukuenftigeZahlung = true;
        } else {
            this.isZukuenftigeZahlung = false;
        }
    }


    private SetDatePickerOptions(startDate: Date, frequenz: String, hasStartDatumChanged: boolean) {

        let initialStartDatum;
        let initialStartDatumAsDate;

        if (hasStartDatumChanged) {
            initialStartDatum = startDate;
            initialStartDatumAsDate = new Date(initialStartDatum.getFullYear(), initialStartDatum.getMonth(), initialStartDatum.getDate());
            console.log("initialStartDatumAsDate");
            console.log(initialStartDatumAsDate);
        } else {
            initialStartDatum = this.form.controls['startDatum'].value.date;
            initialStartDatumAsDate = new Date(initialStartDatum.year, initialStartDatum.month - 1, initialStartDatum.day);
            console.log("initialStartDatumAsDate");
            console.log(initialStartDatumAsDate);
        }

        if (frequenz != "Einmalig" || this.isZukuenftigeZahlung) {
            let dateNow = new Date();
            let dateNowAsDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
            dateNowAsDate.setDate(dateNowAsDate.getDate() + 1);
            let disableUntilStartDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());

            if (initialStartDatumAsDate < dateNowAsDate) {
                this.form.controls['startDatum'].setValue({ date: { day: dateNowAsDate.getDate(), month: dateNowAsDate.getMonth() + 1, year: dateNowAsDate.getFullYear() } })
            }

            let newOptions = JSON.parse(JSON.stringify(this.myStartDatePickerOptions));
            newOptions.disableUntil = { day: disableUntilStartDate.getDate(), month: disableUntilStartDate.getMonth() + 1, year: disableUntilStartDate.getFullYear() };
            this.myStartDatePickerOptions = newOptions;
        } else {
            let newOptions = JSON.parse(JSON.stringify(this.myStartDatePickerOptions));
            newOptions.disableUntil = {};
            this.myStartDatePickerOptions = newOptions;
        }

        let actualStartDatum = this.form.controls['startDatum'].value.date;
        let actualStartDate = new Date(actualStartDatum.year, actualStartDatum.month - 1, actualStartDatum.day);
        let disableUntilEndDate = initialStartDatumAsDate;

        let newOptions = JSON.parse(JSON.stringify(this.myEndDatePickerOptions));

        if (frequenz === "Täglich") {
            disableUntilEndDate.setMonth(initialStartDatumAsDate.getMonth())
            disableUntilEndDate.setFullYear(initialStartDatumAsDate.getFullYear())
            disableUntilEndDate.setDate(initialStartDatumAsDate.getDate())
        } else if (frequenz === "Wöchentlich") {
            disableUntilEndDate.setMonth(initialStartDatumAsDate.getMonth())
            disableUntilEndDate.setFullYear(initialStartDatumAsDate.getFullYear())
            disableUntilEndDate.setDate(initialStartDatumAsDate.getDate() + 6)
        } else if (frequenz === "Monatlich") {
            disableUntilEndDate.setDate(initialStartDatumAsDate.getDate() - 1)
            disableUntilEndDate.setFullYear(initialStartDatumAsDate.getFullYear())
            disableUntilEndDate.setMonth(initialStartDatumAsDate.getMonth() + 1);
        }

        newOptions.disableUntil = { day: disableUntilEndDate.getDate(), month: disableUntilEndDate.getMonth() + 1, year: disableUntilEndDate.getFullYear() };

        let setEndDate = disableUntilEndDate;
        setEndDate.setDate(setEndDate.getDate() + 1);

        this.form.controls['endDatum'].setValue({
            date: {
                day: disableUntilEndDate.getDate(), month: disableUntilEndDate.getMonth() + 1, year: disableUntilEndDate.getFullYear()
            }
        });

        this.myEndDatePickerOptions = newOptions;
    }

    onStartDateChanged(event: IMyDateModel) {

        console.log(event.date);
        console.log("onStartDateChanged");

        let endDatum = this.form.controls['endDatum'].value;
        let startDatum = event.date;

        if (startDatum.year === 0 || startDatum.month === 0 || startDatum.day === 0) {
            this.form.controls['endDatum'].reset();
            return;
        }

        let startDatumAsDate = new Date(startDatum.year, startDatum.month - 1, startDatum.day);

        let frequenz = this.form.controls['transaktionsHaeufigkeit'].value;
        this.SetDatePickerOptions(startDatumAsDate, frequenz, true);
    }

    onEndDateChanged(event: IMyDateModel) {
    }

    onSubmit() {


        let dateNow = new Date();
        let dateNowAsDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
        let startDatum = this.form.controls['startDatum'].value.date;
        let startDatumAsDate = new Date(startDatum.year, startDatum.month - 1, startDatum.day);

        if (dateNowAsDate < startDatumAsDate) {
            var zukuenftigeTransaktion = new WiederkehrendeTransaktion();

            let zukuenftigeTransaktionBetragString = this.form.controls['betrag'].value.toString().replace(',', '.');
            zukuenftigeTransaktion.Betrag = Number.parseFloat(zukuenftigeTransaktionBetragString);
            zukuenftigeTransaktion.IsEinnahme = this.selectedTransaktionsTyp == this.transaktionsTypen[0] ? true : false;
            zukuenftigeTransaktion.Beschreibung = this.form.controls['beschreibung'].value.trim().replace(/ +(?= )/g, '');
            let startDatum = this.form.controls['startDatum'].value.date;
            zukuenftigeTransaktion.StartDatum = new Date(startDatum.year, startDatum.month - 1, startDatum.day);

            let kategorieIndex = this.kategorien.findIndex(x => x.Name == this.form.controls['kategorie'].value);
            zukuenftigeTransaktion.KategorieId = this.kategorien[kategorieIndex].KategorieId;

            zukuenftigeTransaktion.Frequenz = this.transaktionsHaeufigkeiten.findIndex(x => x === this.form.controls['transaktionsHaeufigkeit'].value);

            if (this.hasEndDatum) {
                console.log("hasenddatum: " + this.hasEndDatum);
                let endDatum = this.form.controls['endDatum'].value.date;
                zukuenftigeTransaktion.EndDatum = new Date(endDatum.year, endDatum.month - 1, endDatum.day);
            } else {
                zukuenftigeTransaktion.EndDatum = new Date('01/01/2000');
            }

            if (this.isUpdateZukuenftigeTransaktion) {
                zukuenftigeTransaktion.ZukuenftigeTransaktionId = this.updatedZukuenftigeTransaktion.ZukuenftigeTransaktionId;
                console.log("updating zukuenftigeTransaktion")
                console.log(zukuenftigeTransaktion);
                this._wiederkehrendeTransaktionenController.updateTransaktion(zukuenftigeTransaktion);

            } else {
                console.log("new zukuenftigeTransaktion")
                console.log(zukuenftigeTransaktion);
                this._wiederkehrendeTransaktionenController.addTransaktion(zukuenftigeTransaktion);
            }
        } else {
            var transaktion = new Transaktion();

            let transaktionBetragString = this.form.controls['betrag'].value.toString().replace(',', '.');
            transaktion.Betrag = Number.parseFloat(transaktionBetragString);

            transaktion.IsEinnahme = this.selectedTransaktionsTyp == this.transaktionsTypen[0] ? true : false;
            transaktion.Beschreibung = this.form.controls['beschreibung'].value.trim().replace(/ +(?= )/g, '');

            let date = this.form.controls['startDatum'].value.date;
            transaktion.Datum = new Date(date.year, date.month - 1, date.day);

            console.log(transaktion.Datum);

            let kategorieIndex = this.kategorien.findIndex(x => x.Name == this.form.controls['kategorie'].value);
            transaktion.KategorieId = this.kategorien[kategorieIndex].KategorieId;

            if (this.isUpdateTransaktion) {
                transaktion.TransaktionId = this.updatedTransaktion.TransaktionId;
                console.log("updating transaktion");
                console.log(transaktion);
                this._transaktionenController.updateTransaktion(transaktion);

            } else {
                console.log("new transaktion");
                console.log(transaktion);
                this._transaktionenController.addTransaktion(transaktion);
            }
        }
    }

    onKategorieChanged(k: string) {
        //console.log(this.selectedKategorie);
        //console.log(this.form.controls['kategorie'].value);
        //console.log(k);
    }

    onChangeBetrag() {
        console.log(this.form.valid);
    }

    onHasEndDatumChanged(value: Event) {
        this.hasEndDatum = this.form.controls['hasEndDatum'].value;
        let frequenz = this.form.controls['transaktionsHaeufigkeit'].value;
        let startDatum = this.form.controls['startDatum'].value.date;
        let startDatumAsDate = new Date(startDatum.year, startDatum.month - 1, startDatum.day);

        this.SetDatePickerOptions(startDatumAsDate, frequenz, false);
    }
}
