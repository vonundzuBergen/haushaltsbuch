import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Kategorie } from './kategorie';
import { KategorienController } from './kategorien.controller';
import { Transaktion } from './transaktion';
import { TransaktionenController } from './transaktionen.controller';

@Component({
    selector: 'neue-transaktion-modal',
    templateUrl: '/app/neue-transaktion-modal.component.html'
})
export class NeueTransaktionModalComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    private kategorien: Array<Kategorie>;
    private subscription: Subscription;
    private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd.mm.yyyy',
    };
    private transaktionsTypen = [
        'Einnahme',
        'Ausgabe'
    ];
    private transaktionsHaeufigkeiten = [
        'Einmalig',
        'Woechentlich',
        'Monatlich'
    ];

    constructor(private _kategorienConroller: KategorienController, private _fb: FormBuilder) {
        this.kategorien = new Array<Kategorie>();

        this.subscription = this._kategorienConroller.kategorien$.subscribe(
            kategorien => {
                for (var k of kategorien) {
                    this.kategorien.push(k);
                }
            }
        )
    }

    ngOnInit(): void {
        this.form = this._fb.group({
            transaktionsTyp: ['Einnahme'],
            betrag: ['', Validators.required],
            kategorie: [''],
            beschreibung: [''],
            transaktionsHaeufigkeit: ['Einmalig'],
            datum: ['', Validators.required]
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    clearForm() {
        console.log(this.form.controls['beschreibung'].value);
        console.log(this.form.controls['datum'].value.date.day);
        console.log(this.form.controls['datum'].value.date.month);
        console.log(this.form.controls['datum'].value.date.year);

        console.log(this.form.controls['transaktionsTyp'].value);
        console.log(this.form.controls['transaktionsHaeufigkeit'].value);

        this.form.controls['transaktionsTyp'].reset();
        this.form.controls['beschreibung'].reset();
    }

    onFocusOut(){
        console.log("onFocusOut");
    }

    // dateChanged callback function called when the user select the date. This is mandatory callback
    // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
    onDateChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }
}
