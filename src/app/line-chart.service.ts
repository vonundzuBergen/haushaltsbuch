import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LineChartService {

    getLineChartLabels(): Array<any> {
        let _last30DaysDates = new Array<Date>(30);

        for (var i = 0; i < _last30DaysDates.length; i++) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            console.log(d);
            _last30DaysDates[i] = d;
        }

        return _last30DaysDates.sort(function (date1, date2) {
            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
            return 0;
        }).map(x => x.getDate());
    }

    getLineChartData(): Array<any>{
        
    }
}