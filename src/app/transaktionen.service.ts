import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class TransaktionenService {
    transaktionen = [
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: true,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: false,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
        {
            isEinnahme: true,
            betrag: 100,
            kategorie: "xyz",
            beschreibung: "beschreibung hier",
            datum: new Date()
        },
    ];

    constructor(private http: Http) { }

    getTransaktionen() {
        return this.transaktionen;
    }
}