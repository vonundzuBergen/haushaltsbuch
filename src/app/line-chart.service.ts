import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Transaktion } from './transaktion';
import { DatePipe } from '@angular/common';
import 'rxjs/add/operator/map';

@Injectable()
export class LineChartService {

    constructor(private datePipe: DatePipe) { }

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

    getLineChartData(transaktionen: Array<Transaktion>): Array<any> {

        let sortedTransaktionen = transaktionen.sort((a, b) => {
            if (a.Datum > b.Datum) return 1;
            if (a.Datum < b.Datum) return -1;
            return 0;
        })

        console.log(sortedTransaktionen);

        let earliestDate: Date = sortedTransaktionen[0].Datum;
        let dateNow = new Date();
        let numberOfDays = this.date_diff_indays(earliestDate, dateNow);
        console.log("dateNow");
        console.log(dateNow);
        console.log("earliestDate");
        console.log(earliestDate);
        console.log("numberOfDays");
        console.log(numberOfDays);

        let cashflow: number = 0;
        let counter = 0;

        let dataArray = new Array<any>(numberOfDays + 1);

        for (let i = numberOfDays; i >= 0; i--) {

            let d = new Date();
            d.setDate(d.getDate() - i);
            console.log(d);

            transaktionen.forEach(t => {
                if (t.Datum.getFullYear() == d.getFullYear() && t.Datum.getMonth() + 1 == d.getMonth() + 1 && t.Datum.getDate() == d.getDate()) {
                    if (t.IsEinnahme) {
                        cashflow += t.Betrag;
                    }
                    else {
                        cashflow -= t.Betrag;
                    }
                }
            });

            let formattedDate = this.datePipe.transform(d);
            dataArray[counter] = { date: formattedDate, value: cashflow };

            counter++;
        }

        console.log(dataArray);
        return dataArray;
    }

    date_diff_indays(date1: Date, date2: Date): number {
        let dt1 = new Date(date1);
        let dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    }
}