import { Component, OnInit } from '@angular/core';
import { WiederkehrendeTransaktionenController } from './wiederkehrende-transaktionen.controller';
import { WiederkehrendeTransaktion } from './wiederkehrende-transaktion';
import { Observable } from 'rxjs/Observable';
import { NeueTransaktionModalService } from './neue-transaktion-modal.service';
import { Kategorie } from './kategorie';
import { KategorienController } from './kategorien.controller';
import { GetNameOfKategoriePipe } from './getNameOfKategoriePipe';

@Component({
    selector: 'wiederkehrende-transaktionen-tabelle',
    templateUrl: '/app/wiederkehrende-transaktionen-tabelle.component.html',
    styleUrls: ['app/wiederkehrende-transaktionen-tabelle.component.css']

})
export class WiederkehrendeTransaktionenTabelleComponent implements OnInit {

    transaktionen: Array<WiederkehrendeTransaktion>;
    kategorien: Array<Kategorie>;

    constructor(private _kategorienController: KategorienController, private _transaktionenController: WiederkehrendeTransaktionenController, private _neueTransaktionModalService: NeueTransaktionModalService) {
        this.transaktionen = new Array<WiederkehrendeTransaktion>();

        _kategorienController.kategorien$.subscribe(
            kategorien => {
                this.kategorien = kategorien;
            }
        )

        _transaktionenController.transaktionen$.subscribe(
            transaktionen => {
                this.transaktionen = transaktionen.sort((a, b) => {
                    if (a.StartDatum > b.StartDatum)
                        return 1;
                    else if (a.StartDatum < b.StartDatum)
                        return -1;

                    if (a.Betrag > b.Betrag)
                        return 1;
                    else if (a.Betrag < b.Betrag)
                        return -1;

                    if (a.Beschreibung < b.Beschreibung)
                        return 1;
                    else if (a.Beschreibung > b.Beschreibung)
                        return -1;
                    else
                        return 0;
                });
            }
        );
    }
    ngOnInit(): void {
    }

    editTransaktion(transaktion: WiederkehrendeTransaktion) {
        console.log("in editWiederkehrendeTransaktion");
        this._neueTransaktionModalService.updateWiederkehrendeTransation(transaktion);
    }

    deleteTransaktion(transaktion: WiederkehrendeTransaktion) {
        this._transaktionenController.deleteTransaktion(transaktion.ZukuenftigeTransaktionId);
    }
}