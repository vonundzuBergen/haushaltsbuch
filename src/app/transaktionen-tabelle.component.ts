import { Component, OnInit } from '@angular/core';
import { TransaktionenController } from './transaktionen.controller';
import { Transaktion } from './transaktion';
import { Observable } from 'rxjs/Observable';
import { NeueTransaktionModalService } from './neue-transaktion-modal.service';
import { Kategorie } from './kategorie';
import { KategorienController } from './kategorien.controller';
import { GetNameOfKategoriePipe } from './getNameOfKategoriePipe';

@Component({
    selector: 'transaktionen-tabelle',
    templateUrl: '/app/transaktionen-tabelle.component.html',
    styleUrls: ['app/transaktionen-tabelle.component.css']

})
export class TransaktionenTabelleComponent implements OnInit {

    transaktionen: Array<Transaktion>;
    kategorien: Array<Kategorie>;

    constructor(private _kategorienController: KategorienController, private _transaktionenController: TransaktionenController, private _neueTransaktionModalService: NeueTransaktionModalService) {
        this.transaktionen = new Array<Transaktion>();

        _kategorienController.kategorien$.subscribe(
            kategorien => {
                this.kategorien = kategorien;
            }
        )

        _transaktionenController.transaktionen$.subscribe(
            transaktionen => {
                this.transaktionen = transaktionen.sort((a, b) => {
                    if (a.Datum > b.Datum)
                        return -1;
                    else if (a.Datum < b.Datum)
                        return 1;

                    if (a.Betrag > b.Betrag)
                        return -1;
                    else if (a.Betrag < b.Betrag)
                        return 1;

                    if (a.Beschreibung < b.Beschreibung)
                        return -1;
                    else if (a.Beschreibung > b.Beschreibung)
                        return 1;
                    else
                        return 0;
                });
            }
        );
    }

    ngOnInit(): void {
    }

    editTransaktion(transaktion: Transaktion) {
        console.log("in editTransaktion");
        this._neueTransaktionModalService.updateTransaktion(transaktion);
    }

    deleteTransaktion(transaktion: Transaktion) {
        this._transaktionenController.deleteTransaktion(transaktion.TransaktionId);
    }
}