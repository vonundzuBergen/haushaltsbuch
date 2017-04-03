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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/map");
var kategorien_service_1 = require("./kategorien.service");
var loading_service_1 = require("./loading.service");
var KategorienController = (function () {
    function KategorienController(_kategorienService, _loadingService) {
        this._kategorienService = _kategorienService;
        this._loadingService = _loadingService;
        this._kategorienSource = new BehaviorSubject_1.BehaviorSubject(new Array());
        this.kategorien$ = this._kategorienSource.asObservable();
        this.getAllKategorien();
    }
    KategorienController.prototype.addKategorie = function (kategorie) {
        var _this = this;
        this._loadingService.showLoading(true);
        var obs = this._kategorienService.post(kategorie);
        obs.subscribe(function (res) {
            var t = _this._kategorienSource.getValue();
            kategorie.KategorieId = res.KategorieId;
            t.push(kategorie);
            _this._kategorienSource.next(t);
            console.log(t);
            _this._loadingService.showLoading(false);
        }, function (error) {
            console.log(error);
            _this._loadingService.showLoading(false);
        });
    };
    KategorienController.prototype.updateKategorie = function (kategorie) {
        var _this = this;
        this._loadingService.showLoading(true);
        var obs = this._kategorienService.put(kategorie);
        obs.subscribe(function (res) {
            var t = _this._kategorienSource.getValue();
            var index = t.map(function (x) { return x.KategorieId; }).indexOf(kategorie.KategorieId, 0);
            t.splice(index, 1);
            t.push(kategorie);
            _this._kategorienSource.next(t);
            _this._loadingService.showLoading(false);
        }, function (error) {
            console.log(error);
            _this._loadingService.showLoading(false);
        });
    };
    KategorienController.prototype.deleteKategorie = function (id) {
        var _this = this;
        this._loadingService.showLoading(true);
        var obs = this._kategorienService.delete(id);
        obs.subscribe(function (res) {
            var t = _this._kategorienSource.getValue();
            //console.log(t);
            var index = t.map(function (x) { return x.KategorieId; }).indexOf(id, 0);
            console.log(index);
            t.splice(index, 1);
            console.log(t);
            _this._kategorienSource.next(t);
            _this._loadingService.showLoading(false);
        }, function (error) {
            console.log(error);
            _this._loadingService.showLoading(false);
        });
    };
    KategorienController.prototype.getAllKategorien = function () {
        var _this = this;
        this._loadingService.showLoading(true);
        var obs = this._kategorienService.getAll();
        obs.subscribe(function (res) {
            var t = new Array();
            res.map(function (x) {
                t.push(x);
            });
            _this._kategorienSource.next(t);
            t.forEach(function (element) {
                console.log(element);
            });
            _this._loadingService.showLoading(false);
        }, function (error) {
            console.log(error);
            _this._loadingService.showLoading(false);
        });
    };
    return KategorienController;
}());
KategorienController = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [kategorien_service_1.KategorienService, loading_service_1.LoadingService])
], KategorienController);
exports.KategorienController = KategorienController;
//# sourceMappingURL=kategorien.controller.js.map