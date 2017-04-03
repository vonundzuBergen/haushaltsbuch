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
var common_1 = require("@angular/common");
var CheckEndDatePipe = (function () {
    function CheckEndDatePipe(datePipe) {
        this.datePipe = datePipe;
    }
    CheckEndDatePipe.prototype.transform = function (endDate) {
        var date = new Date('01/01/2000');
        if (endDate.getFullYear() == date.getFullYear()
            && endDate.getMonth() == date.getMonth()
            && endDate.getDate() == date.getDate()) {
            return "-";
        }
        else {
            return this.datePipe.transform(endDate);
        }
    };
    return CheckEndDatePipe;
}());
CheckEndDatePipe = __decorate([
    core_1.Pipe({ name: 'checkEndDate' }),
    __metadata("design:paramtypes", [common_1.DatePipe])
], CheckEndDatePipe);
exports.CheckEndDatePipe = CheckEndDatePipe;
//# sourceMappingURL=checkEndDatePipe.js.map