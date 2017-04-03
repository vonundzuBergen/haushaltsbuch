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
var transaktionen_service_1 = require("./transaktionen.service");
var loading_service_1 = require("./loading.service");
var TransaktionenController = (function () {
    function TransaktionenController(_transaktionenService, _loadingService) {
        this._transaktionenService = _transaktionenService;
        this._loadingService = _loadingService;
        this._transaktionenSource = new BehaviorSubject_1.BehaviorSubject(new Array());
        this.transaktionen$ = this._transaktionenSource.asObservable();
        this.getAllTransaktionen();
    }
    TransaktionenController.prototype.addTransaktion = function (transaktion) {
        var _this = this;
        this._loadingService.showLoading(true);
        var obs = this._transaktionenService.post(transaktion);
        obs.subscribe(function (res) {
            var t = _this._transaktionenSource.getValue();
            transaktion.TransaktionId = res.TransaktionId;
            t.push(transaktion);
            _this._transaktionenSource.next(t);
            _this._loadingService.showLoading(false);
        }, function (error) {
            console.log(error);
            _this._loadingService.showLoading(false);
        });
    };
    TransaktionenController.prototype.updateTransaktion = function (transaktion) {
        var _this = this;
        this._loadingService.showLoading(true);
        var obs = this._transaktionenService.put(transaktion);
        obs.subscribe(function (res) {
            var t = _this._transaktionenSource.getValue();
            var index = t.map(function (x) { return x.TransaktionId; }).indexOf(transaktion.TransaktionId, 0);
            t.splice(index, 1);
            t.push(transaktion);
            _this._transaktionenSource.next(t);
            _this._loadingService.showLoading(false);
        }, function (error) {
            console.log(error);
            _this._loadingService.showLoading(false);
        });
    };
    TransaktionenController.prototype.deleteTransaktion = function (id) {
        var _this = this;
        this._loadingService.showLoading(true);
        var obs = this._transaktionenService.delete(id);
        obs.subscribe(function (res) {
            var t = _this._transaktionenSource.getValue();
            var index = t.map(function (x) { return x.TransaktionId; }).indexOf(id, 0);
            t.splice(index, 1);
            _this._transaktionenSource.next(t);
            _this._loadingService.showLoading(false);
        }, function (error) {
            console.log(error);
            _this._loadingService.showLoading(false);
        });
    };
    TransaktionenController.prototype.getAllTransaktionen = function () {
        var _this = this;
        this._loadingService.showLoading(true);
        var obs = this._transaktionenService.getAll();
        obs.subscribe(function (res) {
            console.log("starting");
            var t = new Array();
            res.map(function (x) {
                x.Datum = x.Datum;
                t.push(x);
            });
            console.log("fertig");
            console.log(t);
            _this._transaktionenSource.next(t);
            _this._loadingService.showLoading(false);
        }, function (error) {
            console.log(error);
            _this._loadingService.showLoading(false);
        });
    };
    TransaktionenController.prototype.getFilteredTransaktionen = function (numberOfDays) {
        var _this = this;
        this._loadingService.showLoading(true);
        var obs = this._transaktionenService.getAll();
        obs.subscribe(function (res) {
            var cutOffDatum = new Date();
            cutOffDatum.setDate(cutOffDatum.getDate() - numberOfDays);
            var cutOffDatumAsDate = new Date(cutOffDatum.getFullYear(), cutOffDatum.getMonth(), cutOffDatum.getDate());
            console.log("cutOffDatumAsDate");
            console.log(cutOffDatumAsDate);
            console.log("starting");
            console.log("cutOffDatumAsDate");
            console.log(cutOffDatumAsDate);
            var t = new Array();
            res.map(function (x) {
                if (x.Datum >= cutOffDatumAsDate) {
                    t.push(x);
                }
                else {
                    console.log(x.Datum);
                    console.log(cutOffDatum);
                }
            });
            console.log("fertig");
            console.log(t);
            _this._transaktionenSource.next(t);
            _this._loadingService.showLoading(false);
        }, function (error) {
            console.log(error);
            _this._loadingService.showLoading(false);
        });
    };
    return TransaktionenController;
}());
TransaktionenController = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [transaktionen_service_1.TransaktionenService, loading_service_1.LoadingService])
], TransaktionenController);
exports.TransaktionenController = TransaktionenController;
//# sourceMappingURL=transaktionen.controller.js.map