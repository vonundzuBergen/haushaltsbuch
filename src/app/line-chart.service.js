"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
require("rxjs/add/operator/map");
var LineChartService = (function () {
    function LineChartService(datePipe) {
        this.datePipe = datePipe;
    }
    LineChartService.prototype.getLineChartLabels = function (numberOfDays) {
        var _dates = new Array(numberOfDays);
        for (var i = 0; i < _dates.length; i++) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            _dates[i] = d;
        }
        return _dates.sort(function (date1, date2) {
            if (date1 > date2)
                return 1;
            if (date1 < date2)
                return -1;
            return 0;
        }).map(function (x) { return x.getDate(); });
    };
    LineChartService.prototype.getLineChartData = function (transaktionen) {
        var sortedTransaktionen = transaktionen.sort(function (a, b) {
            if (a.Datum > b.Datum)
                return 1;
            if (a.Datum < b.Datum)
                return -1;
            return 0;
        });
        console.log(sortedTransaktionen);
        var earliestDate = sortedTransaktionen[0].Datum;
        var dateNow = new Date();
        var numberOfDays = this.date_diff_indays(earliestDate, dateNow);
        console.log("dateNow");
        console.log(dateNow);
        console.log("earliestDate");
        console.log(earliestDate);
        console.log("numberOfDays");
        console.log(numberOfDays);
        var cashflow = 0;
        var counter = 0;
        var dataArray = new Array(numberOfDays + 1);
        var _loop_1 = function (i) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            console.log(d);
            transaktionen.forEach(function (t) {
                if (t.Datum.getFullYear() == d.getFullYear() && t.Datum.getMonth() + 1 == d.getMonth() + 1 && t.Datum.getDate() == d.getDate()) {
                    if (t.IsEinnahme) {
                        cashflow += t.Betrag;
                    }
                    else {
                        cashflow -= t.Betrag;
                    }
                }
            });
            var formattedDate = this_1.datePipe.transform(d);
            dataArray[counter] = { date: formattedDate, value: cashflow };
            counter++;
        };
        var this_1 = this;
        for (var i = numberOfDays; i >= 0; i--) {
            _loop_1(i);
        }
        console.log(dataArray);
        return dataArray;
    };
    LineChartService.prototype.date_diff_indays = function (date1, date2) {
        var dt1 = new Date(date1);
        var dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    };
    return LineChartService;
}());
LineChartService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [common_1.DatePipe])
], LineChartService);
exports.LineChartService = LineChartService;
//# sourceMappingURL=line-chart.service.js.map