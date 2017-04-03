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
var transaktionen_controller_1 = require("./transaktionen.controller");
var cashflow_overview_panel_service_1 = require("./cashflow-overview-panel.service");
var CashflowOverviewPanelComponent = (function () {
    function CashflowOverviewPanelComponent(_transaktionenController, _cashflowService) {
        var _this = this;
        this._transaktionenController = _transaktionenController;
        this._cashflowService = _cashflowService;
        _transaktionenController.transaktionen$.subscribe(function (transaktionen) {
            _this.gesamtEinnahmen = _cashflowService.getGesamtEinnahmen(transaktionen);
            _this.gesamtAusgaben = _cashflowService.getGesamtAusgaben(transaktionen);
            _this.gesamtCashflow = _this.gesamtEinnahmen - _this.gesamtAusgaben;
        });
    }
    CashflowOverviewPanelComponent.prototype.ngOnInit = function () {
    };
    return CashflowOverviewPanelComponent;
}());
CashflowOverviewPanelComponent = __decorate([
    core_1.Component({
        selector: 'cashflow-overview-panel',
        templateUrl: '/app/cashflow-overview-panel.component.html',
        styleUrls: ['app/cashflow-overview-panel.component.css']
    }),
    __metadata("design:paramtypes", [transaktionen_controller_1.TransaktionenController, cashflow_overview_panel_service_1.CashflowOverviewPanelService])
], CashflowOverviewPanelComponent);
exports.CashflowOverviewPanelComponent = CashflowOverviewPanelComponent;
//# sourceMappingURL=cashflow-overview-panel.component.js.map