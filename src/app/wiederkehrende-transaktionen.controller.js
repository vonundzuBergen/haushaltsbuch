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
var wiederkehrende_transaktionen_service_1 = require("./wiederkehrende-transaktionen.service");
var loading_service_1 = require("./loading.service");
var WiederkehrendeTransaktionenController = (function () {
    function WiederkehrendeTransaktionenController(_transaktionenService, _loadingService) {
        this._transaktionenService = _transaktionenService;
        this._loadingService = _loadingService;
        this._transaktionenSource = new BehaviorSubject_1.BehaviorSubject(new Array());
        this.transaktionen$ = this._transaktionenSource.asObservable();
        this.getAllTransaktionen();
    }
    WiederkehrendeTransaktionenController.prototype.addTransaktion = function (transaktion) {
        var _this = this;
        this._loadingService.showLoading(true);
        var obs = this._transaktionenService.post(transaktion);
        obs.subscribe(function (res) {
            var t = _this._transaktionenSource.getValue();
            transaktion.ZukuenftigeTransaktionId = res.ZukuenftigeTransaktionId;
            t.push(transaktion);
            _this._transaktionenSource.next(t);
            _this._loadingService.showLoading(false);
        }, function (error) {
            console.log(error);
            _this._loadingService.showLoading(false);
        });
    };
    WiederkehrendeTransaktionenController.prototype.updateTransaktion = function (transaktion) {
        var _this = this;
        this._loadingService.showLoading(true);
        var obs = this._transaktionenService.put(transaktion);
        obs.subscribe(function (res) {
            var t = _this._transaktionenSource.getValue();
            var index = t.map(function (x) { return x.ZukuenftigeTransaktionId; }).indexOf(transaktion.ZukuenftigeTransaktionId, 0);
            t.splice(index, 1);
            t.push(transaktion);
            _this._transaktionenSource.next(t);
            _this._loadingService.showLoading(false);
        }, function (error) {
            console.log(error);
            _this._loadingService.showLoading(false);
        });
    };
    WiederkehrendeTransaktionenController.prototype.deleteTransaktion = function (id) {
        var _this = this;
        this._loadingService.showLoading(true);
        var obs = this._transaktionenService.delete(id);
        obs.subscribe(function (res) {
            var t = _this._transaktionenSource.getValue();
            var index = t.map(function (x) { return x.ZukuenftigeTransaktionId; }).indexOf(id, 0);
            t.splice(index, 1);
            _this._transaktionenSource.next(t);
            _this._loadingService.showLoading(false);
        }, function (error) {
            console.log(error);
            _this._loadingService.showLoading(false);
        });
    };
    WiederkehrendeTransaktionenController.prototype.getAllTransaktionen = function () {
        var _this = this;
        this._loadingService.showLoading(true);
        var obs = this._transaktionenService.getAll();
        obs.subscribe(function (res) {
            var t = new Array();
            res.map(function (x) {
                t.push(x);
            });
            _this._transaktionenSource.next(t);
            console.log(t);
            _this._loadingService.showLoading(false);
        }, function (error) {
            console.log(error);
            _this._loadingService.showLoading(false);
        });
    };
    return WiederkehrendeTransaktionenController;
}());
WiederkehrendeTransaktionenController = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [wiederkehrende_transaktionen_service_1.WiederkehrendeTransaktionenService, loading_service_1.LoadingService])
], WiederkehrendeTransaktionenController);
exports.WiederkehrendeTransaktionenController = WiederkehrendeTransaktionenController;
//# sourceMappingURL=wiederkehrende-transaktionen.controller.js.map