import { Component, OnInit } from '@angular/core';
import { WiederkehrendeTransaktionenController } from './wiederkehrende-transaktionen.controller';
import { WiederkehrendeTransaktion } from './wiederkehrende-transaktion';
import { Observable } from 'rxjs/Observable';
import { NeueTransaktionModalService } from './neue-transaktion-modal.service';

@Component({
    selector: 'wiederkehrende-transaktionen-tabelle',
    templateUrl: '/app/wiederkehrende-transaktionen-tabelle.component.html',
    styleUrls: ['app/wiederkehrende-transaktionen-tabelle.component.css']

})
export class WiederkehrendeTransaktionenTabelleComponent implements OnInit {

    transaktionen: Array<WiederkehrendeTransaktion>;

    constructor(private _transaktionenController: WiederkehrendeTransaktionenController, private _neueTransaktionModalService: NeueTransaktionModalService) {
        this.transaktionen = new Array<WiederkehrendeTransaktion>();

        _transaktionenController.transaktionen$.subscribe(
            transaktionen => {
                for (var t of transaktionen) {
                    this.transaktionen.push(t);
                }
            }
        );
    }
    ngOnInit(): void {
    }

    editTransaktion(transaktion: WiederkehrendeTransaktion) {
        this._neueTransaktionModalService.updateWiederkehrendeTransation(transaktion);
    }

    deleteTransaktion(transaktion: WiederkehrendeTransaktion){
        this._transaktionenController.deleteTransaktion(transaktion.id);
    }
}