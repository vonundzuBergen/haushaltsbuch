"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
var GetNameOfKategoriePipe = (function () {
    function GetNameOfKategoriePipe() {
    }
    GetNameOfKategoriePipe.prototype.transform = function (id, kategorien) {
        if (kategorien.length < 1) {
            return;
        }
        var kategorie = kategorien.find(function (x) { return x.KategorieId == id; });
        return kategorie.Name;
    };
    return GetNameOfKategoriePipe;
}());
GetNameOfKategoriePipe = __decorate([
    core_1.Pipe({ name: 'getName' })
], GetNameOfKategoriePipe);
exports.GetNameOfKategoriePipe = GetNameOfKategoriePipe;
//# sourceMappingURL=getNameOfKategoriePipe.js.map