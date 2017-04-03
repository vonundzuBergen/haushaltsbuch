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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var KategorienService = (function () {
    function KategorienService(http) {
        this.http = http;
        this.baseUrl = "http://localhost:34408/api/Kategorien";
    }
    KategorienService.prototype.put = function (kategorie) {
        var bodyString = JSON.stringify(kategorie);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.baseUrl + "(" + kategorie.KategorieId + ")";
        return this.http
            .put(url, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    KategorienService.prototype.post = function (kategorie) {
        var bodyString = JSON.stringify(kategorie); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        var url = "" + this.baseUrl;
        return this.http
            .post(url, bodyString, options) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); }); //...errors
    };
    KategorienService.prototype.delete = function (id) {
        var url = this.baseUrl + "(" + id + ")";
        return this.http
            .delete(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    KategorienService.prototype.get = function (id) {
        var url = this.baseUrl + "/" + id;
        return this.http
            .get(url)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    KategorienService.prototype.getAll = function () {
        var url = "" + this.baseUrl;
        return this.http
            .get(url)
            .map(function (response) {
            return response.json().value;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    return KategorienService;
}());
KategorienService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], KategorienService);
exports.KategorienService = KategorienService;
//# sourceMappingURL=kategorien.service.js.map