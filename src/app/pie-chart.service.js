"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var PieChartService = (function () {
    function PieChartService() {
    }
    PieChartService.prototype.getPieChartLabelsAndData = function (kategorien, transaktion) {
        var kategorienFreq = new Array();
        var _loop_1 = function () {
            var frequency = 0;
            transaktion.forEach(function (t) {
                if (t.KategorieId == kategorien[i].KategorieId && t.IsEinnahme == false) {
                    frequency += t.Betrag;
                }
            });
            if (frequency == 0) {
                return "continue";
            }
            kategorienFreq.push({ name: kategorien[i].Name, y: frequency });
            /*
            if (((frequency / transaktion.length) * 100) < 5) {

                if (kategorienFreq.length < 1) {
                    kategorienFreq.push({ name: "Sonstige", y: frequency });
                }
                else if (kategorienFreq.find(x => x.name == "Sonstige")) {

                    console.log("Sonstige");
                    let entry = kategorienFreq.find(x => x.name == "Sonstige");
                    let index = kategorienFreq.indexOf(entry);
                    kategorienFreq[index].y += frequency;

                }
                else {
                    kategorienFreq.push({ name: "Sonstige", y: frequency });
                }
            }
            else {
                kategorienFreq.push({ name: kategorien[i].Name, y: frequency });
            }
            */
        };
        for (var i = 0; i < kategorien.length; i++) {
            _loop_1();
        }
        console.log(kategorienFreq);
        return kategorienFreq;
    };
    return PieChartService;
}());
PieChartService = __decorate([
    core_1.Injectable()
], PieChartService);
exports.PieChartService = PieChartService;
//# sourceMappingURL=pie-chart.service.js.map