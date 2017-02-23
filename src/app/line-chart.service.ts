import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LineChartService {

    getLineChartLabels(transaktionen: Array<any>): Array<any> {

        console.log(transaktionen);
        let _last30DaysDates = new Array<Date>(30);

        for (var i = 0; i < _last30DaysDates.length; i++) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            _last30DaysDates[i] = d;
        }

        return _last30DaysDates.sort(function (date1, date2) {
            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
            return 0;
        }).map(x => x.getDate());
    }

    getLineChartData(transaktionen: Array<any>): Array<any> {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    }
}