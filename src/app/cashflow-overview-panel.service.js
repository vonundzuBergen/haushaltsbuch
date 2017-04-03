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
var CashflowOverviewPanelService = (function () {
    function CashflowOverviewPanelService() {
    }
    CashflowOverviewPanelService.prototype.getGesamtEinnahmen = function (transaktionen) {
        var total = 0;
        for (var _i = 0, transaktionen_1 = transaktionen; _i < transaktionen_1.length; _i++) {
            var transaktion = transaktionen_1[_i];
            if (transaktion.IsEinnahme) {
                total += transaktion.Betrag;
            }
        }
        return total;
    };
    CashflowOverviewPanelService.prototype.getGesamtAusgaben = function (transaktionen) {
        var total = 0;
        for (var _i = 0, transaktionen_2 = transaktionen; _i < transaktionen_2.length; _i++) {
            var transaktion = transaktionen_2[_i];
            if (!transaktion.IsEinnahme) {
                total += transaktion.Betrag;
            }
        }
        return total;
    };
    return CashflowOverviewPanelService;
}());
CashflowOverviewPanelService = __decorate([
    core_1.Injectable()
], CashflowOverviewPanelService);
exports.CashflowOverviewPanelService = CashflowOverviewPanelService;
//# sourceMappingURL=cashflow-overview-panel.service.js.map