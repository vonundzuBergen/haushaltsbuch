import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Kategorie } from './kategorie';
import { Transaktion } from './transaktion';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PieChartService {
    getPieChartLabels(kategorien: Array<Kategorie>): Array<string> {
        let k = new Array<string>(kategorien.length);

        for (var i = 0; i < kategorien.length; i++) {
            k[i] = kategorien[i].Name;
        }

        return k;
    }

    getPieChartData(kategorien: Array<Kategorie>, transaktionen: Array<Transaktion>): Array<number> {
        let k = new Array<number>(kategorien.length).fill(0);

        for (var i = 0; i < kategorien.length; i++) {
            transaktionen.forEach(transaktion => {
                if (transaktion.kategorie == kategorien[i].Name) {
                    k[i] += transaktion.betrag
                }
            });
        }

        return k;
    }
}