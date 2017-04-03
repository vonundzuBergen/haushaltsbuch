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
var kategorien_controller_1 = require("./kategorien.controller");
var transaktionen_controller_1 = require("./transaktionen.controller");
var info_box_service_1 = require("./info-box.service");
var wiederkehrende_transaktionen_controller_1 = require("./wiederkehrende-transaktionen.controller");
var KategorienPanelComponent = (function () {
    function KategorienPanelComponent(_wiederkehrendeTransaktionenController, _infoBoxService, _kategorienController, _transaktionenController) {
        var _this = this;
        this._wiederkehrendeTransaktionenController = _wiederkehrendeTransaktionenController;
        this._infoBoxService = _infoBoxService;
        this._kategorienController = _kategorienController;
        this._transaktionenController = _transaktionenController;
        this.kategorien = new Array();
        this.transaktionen = new Array();
        _kategorienController.kategorien$.subscribe(function (kategorien) {
            _this.kategorien = kategorien;
        });
        _transaktionenController.transaktionen$.subscribe(function (transaktionen) {
            _this.transaktionen = transaktionen;
        });
        _wiederkehrendeTransaktionenController.transaktionen$.subscribe(function (transaktionen) {
            _this.wiederkehrendeTransaktionen = transaktionen;
        });
    }
    KategorienPanelComponent.prototype.deleteKategorie = function (kategorie) {
        console.log("in deleteKategorie");
        var transaktionenIndex = this.transaktionen.findIndex(function (x) { return x.KategorieId == kategorie.KategorieId; });
        var wiederkehrendeTransaktionenIndex = this.wiederkehrendeTransaktionen.findIndex(function (x) { return x.KategorieId == kategorie.KategorieId; });
        if (transaktionenIndex != -1 || wiederkehrendeTransaktionenIndex != -1) {
            this._infoBoxService.showInfoBox(true);
            return;
        }
        this._kategorienController.deleteKategorie(kategorie.KategorieId);
    };
    return KategorienPanelComponent;
}());
KategorienPanelComponent = __decorate([
    core_1.Component({
        selector: 'kategorien-panel',
        templateUrl: '/app/kategorien-panel.component.html',
        styleUrls: ['app/kategorien-panel.component.css']
    }),
    __metadata("design:paramtypes", [wiederkehrende_transaktionen_controller_1.WiederkehrendeTransaktionenController, info_box_service_1.InfoBoxService, kategorien_controller_1.KategorienController, transaktionen_controller_1.TransaktionenController])
], KategorienPanelComponent);
exports.KategorienPanelComponent = KategorienPanelComponent;
//# sourceMappingURL=kategorien-panel.component.js.map