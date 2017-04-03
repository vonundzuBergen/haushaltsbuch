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
var neue_transaktion_modal_service_1 = require("./neue-transaktion-modal.service");
var kategorien_controller_1 = require("./kategorien.controller");
var TransaktionenTabelleComponent = (function () {
    function TransaktionenTabelleComponent(_kategorienController, _transaktionenController, _neueTransaktionModalService) {
        var _this = this;
        this._kategorienController = _kategorienController;
        this._transaktionenController = _transaktionenController;
        this._neueTransaktionModalService = _neueTransaktionModalService;
        this.transaktionen = new Array();
        _kategorienController.kategorien$.subscribe(function (kategorien) {
            _this.kategorien = kategorien;
        });
        _transaktionenController.transaktionen$.subscribe(function (transaktionen) {
            _this.transaktionen = transaktionen.slice();
            _this.transaktionen = _this.transaktionen.sort(function (a, b) {
                if (a.Datum > b.Datum)
                    return -1;
                else if (a.Datum < b.Datum)
                    return 1;
                if (a.Betrag > b.Betrag)
                    return -1;
                else if (a.Betrag < b.Betrag)
                    return 1;
                if (a.Beschreibung < b.Beschreibung)
                    return -1;
                else if (a.Beschreibung > b.Beschreibung)
                    return 1;
                else
                    return 0;
            });
        });
    }
    TransaktionenTabelleComponent.prototype.ngOnInit = function () {
    };
    TransaktionenTabelleComponent.prototype.editTransaktion = function (transaktion) {
        console.log("in editTransaktion");
        this._neueTransaktionModalService.updateTransaktion(transaktion);
    };
    TransaktionenTabelleComponent.prototype.deleteTransaktion = function (transaktion) {
        this._transaktionenController.deleteTransaktion(transaktion.TransaktionId);
    };
    return TransaktionenTabelleComponent;
}());
TransaktionenTabelleComponent = __decorate([
    core_1.Component({
        selector: 'transaktionen-tabelle',
        templateUrl: '/app/transaktionen-tabelle.component.html',
        styleUrls: ['app/transaktionen-tabelle.component.css']
    }),
    __metadata("design:paramtypes", [kategorien_controller_1.KategorienController, transaktionen_controller_1.TransaktionenController, neue_transaktion_modal_service_1.NeueTransaktionModalService])
], TransaktionenTabelleComponent);
exports.TransaktionenTabelleComponent = TransaktionenTabelleComponent;
//# sourceMappingURL=transaktionen-tabelle.component.js.map