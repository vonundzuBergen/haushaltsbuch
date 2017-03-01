import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Kategorie } from './kategorie';
import { KategorienController } from './kategorien.controller';
import { Transaktion } from './transaktion';
import { TransaktionenController } from './transaktionen.controller';
import { NeueTransaktionModalService } from './neue-transaktion-modal.service';

@Component({
    selector: 'neue-transaktion-modal',
    templateUrl: '/app/neue-transaktion-modal.component.html'
})
export class NeueTransaktionModalComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    private kategorien: Array<Kategorie>;
    private kategorienControllerSubscription: Subscription;
    private neueTransaktionModalServiceSubscription: Subscription;
    private currentDateObject: any;
    private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd.mm.yyyy',
    };
    private transaktionsTypen = [
        'Einnahme',
        'Ausgabe'
    ];
    private selectedTransaktionsTyp: string;

    private transaktionsHaeufigkeiten = [
        'Einmalig',
        'Woechentlich',
        'Monatlich'
    ];

    constructor(private _kategorienController: KategorienController, private _fb: FormBuilder, private _neueTransaktionModalService: NeueTransaktionModalService) {
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

        this.neueTransaktionModalServiceSubscription = this._neueTransaktionModalService.transaktion$.subscribe(
            transaktion => this.populateForm(transaktion)
        );

        this.kategorienControllerSubscription = this._kategorienController.kategorien$.subscribe(
            kategorien => {
                for (var k of kategorien) {
                    this.kategorien.push(k);
                }
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
            datum: [this.currentDateObject, Validators.required]
        })
    }

    ngOnDestroy() {
        this.neueTransaktionModalServiceSubscription.unsubscribe();
        this.kategorienControllerSubscription.unsubscribe();
    }


    populateForm(transaktion: Transaktion) {

        this.selectedTransaktionsTyp = transaktion.isEinnahme ? 'Einnahme' : 'Ausgabe';
        this.form.controls['betrag'].setValue(transaktion.betrag);
        this.form.controls['kategorie'].setValue(transaktion.kategorie);
        this.form.controls['beschreibung'].setValue(transaktion.beschreibung);
        this.form.controls['datum'].setValue({ date: { year: transaktion.year, month: transaktion.month, day: transaktion.day } });

        console.log("here we are");
    }

    clearForm() {
        this.selectedTransaktionsTyp = 'Einnahme';
        this.form.controls['betrag'].reset();
        this.form.controls['kategorie'].reset();
        this.form.controls['beschreibung'].reset();
        this.form.controls['datum'].setValue(this.currentDateObject);
    }

    onFocusOut() {
        console.log("onFocusOut");
    }

    onTransaktionsTypSelectionChange(typ: string) {
        this.selectedTransaktionsTyp = typ;
        console.log(this.selectedTransaktionsTyp);
    }

    // dateChanged callback function called when the user select the date. This is mandatory callback
    // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
    onDateChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }
}
