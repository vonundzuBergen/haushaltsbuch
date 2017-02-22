import { Component, OnInit } from '@angular/core';
import { TransaktionenService } from './transaktionen.service';
import { Transaktion } from './transaktion';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'transaktionen-tabelle',
    templateUrl: '/app/transaktionen-tabelle.component.html',
    styleUrls: ['app/transaktionen-tabelle.component.css']

})
export class TransaktionenTabelleComponent implements OnInit {

    transaktionen: Array<Transaktion>;

    constructor(private _transaktionenService: TransaktionenService) {
        this.transaktionen = new Array<Transaktion>();

        _transaktionenService.transaktionen$.subscribe(
            transaktionen => {
                for (var t of transaktionen) {
                    this.transaktionen.push(t);
                }
            }
        );
    }
    ngOnInit(): void {
    }
}