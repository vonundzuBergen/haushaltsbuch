import { Component, OnInit } from '@angular/core';
import { TransaktionenController } from './transaktionen.controller';
import { Transaktion } from './transaktion';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'transaktionen-tabelle',
    templateUrl: '/app/transaktionen-tabelle.component.html',
    styleUrls: ['app/transaktionen-tabelle.component.css']

})
export class TransaktionenTabelleComponent implements OnInit {

    transaktionen: Array<Transaktion>;

    constructor(private _transaktionenController: TransaktionenController) {
        this.transaktionen = new Array<Transaktion>();

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

    editTransaktion(){
        
    }
}