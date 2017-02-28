import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Transaktion } from './transaktion';

import 'rxjs/add/operator/map';

@Injectable()
export class LineChartService {

    getLineChartLabels(numberOfDays: number): Array<number> {
        let _dates = new Array<Date>(numberOfDays);

        for (var i = 0; i < _dates.length; i++) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            _dates[i] = d;
        }

        return _dates.sort(function (date1, date2) {
            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
            return 0;
        }).map(x => x.getDate());
    }

    getLineChartData(numberOfDays: number, transaktionen: Array<Transaktion>, einnahmen: Array<number>, ausgaben: Array<number>) {

        let counter = 0;

        for (let i = numberOfDays - 1; i >= 0; i--) {

            let d = new Date();
            d.setDate(d.getDate() - i);

            transaktionen.forEach(t => {

                if (t.year == d.getFullYear() && t.month == d.getMonth() + 1 && t.day == d.getDate()) {
                    if (t.isEinnahme) {
                        einnahmen[counter] += t.betrag;
                    }
                    else {
                        ausgaben[counter] -= t.betrag;
                    }
                }
            });
            counter++;
        }
    }
}