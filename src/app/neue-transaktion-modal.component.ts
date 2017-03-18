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
declare var $: any;

@Component({
    selector: 'neue-transaktion-modal',
    templateUrl: '/app/neue-transaktion-modal.component.html'
})
export class NeueTransaktionModalComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    private kategorien: Array<Kategorie>;
    private kategorienControllerSubscription: Subscription;
    private transaktionSubscription: Subscription;
    private wiederkehrendeTransaktionSubscription: Subscription;
    private currentDateObject: any;
    private isWiederkehrendeZahlung: boolean;
    private isUpdateWiederkehrendeZahlung: boolean;
    private myStartDatePickerOptions: IMyOptions;
    private myEndDatePickerOptions: IMyOptions;
    private transaktionsTypen = [
        'Einnahme',
        'Ausgabe'
    ];
    private selectedTransaktionsTyp: string;

    private transaktionsHaeufigkeiten = [
        'Einmalig',
        'Täglich',
        'Wöchentlich',
        'Monatlich'
    ];

    constructor(private _kategorienController: KategorienController, private _fb: FormBuilder, private _neueTransaktionModalService: NeueTransaktionModalService) {
        this.onModalHidden();
        this.isUpdateWiederkehrendeZahlung = true;
        this.kategorien = new Array<Kategorie>();
        this.selectedTransaktionsTyp = this.transaktionsTypen[0];
        let currentDate = new Date();
        this.currentDateObject = {
            date: {
                year: currentDate.getFullYear(),
                month: currentDate.getMonth() + 1,
                day: currentDate.getDate()
            }
        };

        this.myStartDatePickerOptions = {
            dateFormat: 'dd.mm.yyyy',
        };

        this.myEndDatePickerOptions = {
            dateFormat: 'dd.mm.yyyy',
            disableUntil: { year: this.currentDateObject.date.year, month: this.currentDateObject.date.month, day: this.currentDateObject.date.day }
        };

        this.transaktionSubscription = this._neueTransaktionModalService.transaktion$.subscribe(
            transaktion => this.populateFormWithTransaktion(transaktion)
        );

        this.wiederkehrendeTransaktionSubscription = this._neueTransaktionModalService.wiederkehrendeTransaktion$.subscribe(
            transaktion => this.populateFormWithWiederkehrendeTransaktion(transaktion)
        );

        this.kategorienControllerSubscription = this._kategorienController.kategorien$.subscribe(
            kategorien => {
                console.log(kategorien);
                this.kategorien = kategorien;
            }
        )
    }

    ngOnInit(): void {
        this.form = this._fb.group({
            transaktionsTyp: [''],
            betrag: ['', Validators.required],
            kategorie: [''],
            beschreibung: [''],
            transaktionsHaeufigkeit: ['Einmalig'],
            startDatum: [this.currentDateObject, Validators.required],
            endDatum: ['']
        })
    }

    ngOnDestroy() {
        this.transaktionSubscription.unsubscribe();
        this.kategorienControllerSubscription.unsubscribe();
        this.wiederkehrendeTransaktionSubscription.unsubscribe();
    }


    private populateFormWithTransaktion(transaktion: Transaktion) {

        this.isUpdateWiederkehrendeZahlung = false;
        this.isWiederkehrendeZahlung = false;
        this.selectedTransaktionsTyp = transaktion.isEinnahme ? 'Einnahme' : 'Ausgabe';
        this.form.controls['betrag'].setValue(transaktion.betrag);
        this.form.controls['kategorie'].setValue(transaktion.kategorie);
        this.form.controls['beschreibung'].setValue(transaktion.beschreibung);
        this.form.controls['transaktionsHaeufigkeit'].setValue(this.transaktionsHaeufigkeiten[0]);
        this.form.controls['startDatum'].setValue({ date: { year: transaktion.year, month: transaktion.month, day: transaktion.day } });
    }

    private populateFormWithWiederkehrendeTransaktion(transaktion: WiederkehrendeTransaktion) {

        this.isUpdateWiederkehrendeZahlung = true;
        this.isWiederkehrendeZahlung = true;
        this.selectedTransaktionsTyp = transaktion.isEinnahme ? 'Einnahme' : 'Ausgabe';
        this.form.controls['betrag'].setValue(transaktion.betrag);
        this.form.controls['kategorie'].setValue(transaktion.kategorie);
        this.form.controls['beschreibung'].setValue(transaktion.beschreibung);
        this.form.controls['transaktionsHaeufigkeit'].setValue(this.transaktionsHaeufigkeiten[transaktion.frequenz]);
        this.form.controls['startDatum'].setValue({ date: { year: transaktion.startYear, month: transaktion.startMonth, day: transaktion.startDay } });
        this.form.controls['endDatum'].setValue({ date: { year: transaktion.endYear, month: transaktion.endMonth, day: transaktion.endDay } });
    }

    clearForm() {
        this.selectedTransaktionsTyp = 'Einnahme';
        this.form.controls['betrag'].reset();
        this.form.controls['kategorie'].reset();
        this.form.controls['beschreibung'].reset();
        this.form.controls['transaktionsHaeufigkeit'].setValue(this.transaktionsHaeufigkeiten[0]);
        this.form.controls['startDatum'].setValue(this.currentDateObject);
        this.isUpdateWiederkehrendeZahlung = true;
    }

    onFocusOut() {
        console.log("onFocusOut");
    }

    onTransaktionsTypSelectionChange(typ: string) {
        this.selectedTransaktionsTyp = typ;
        console.log(this.selectedTransaktionsTyp);
    }

    onTransaktionsHaeufigkeitChange(h: string) {
        if (h == 'Einmalig') {
            this.isWiederkehrendeZahlung = false;
        }
        else {
            this.isWiederkehrendeZahlung = true;
        }
        console.log(this.isWiederkehrendeZahlung);
    }

    // dateChanged callback function called when the user select the date. This is mandatory callback
    // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
    onStartDateChanged(event: IMyDateModel) {

        let endDatum = this.form.controls['endDatum'].value;
        let startDatum = event.date;

        if (startDatum.year === 0 || startDatum.month === 0 || startDatum.day === 0) {
            this.form.controls['endDatum'].reset();
            return;
        }

        let newOptions = JSON.parse(JSON.stringify(this.myEndDatePickerOptions));
        newOptions.disableUntil = { day: startDatum.day, month: startDatum.month, year: startDatum.year };
        this.myEndDatePickerOptions = newOptions;
        console.log(this.myEndDatePickerOptions);

        if (!endDatum || 0 === endDatum.length) {
            return;
        }

        let endDatumAsDate = new Date(endDatum.date.year, endDatum.date.month, endDatum.date.day);
        let startDatumAsDate = new Date(startDatum.year, startDatum.month, startDatum.day);

        if (endDatumAsDate < startDatumAsDate) {
            this.form.controls['endDatum'].setValue({ date: startDatum });
        }
    }

    onEndDateChanged(event: IMyDateModel) {

    }

    onModalHidden() {
        ////This event is fired immediately when the hide instance method has been called.
        ///called to reset the events and the headers.
        $('#neueTransaktionModal').on('shown.bs.modal', function () {


            console.log("modal is hidden");
        });
    }
}
