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
var kategorie_1 = require("./kategorie");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/do");
var NeueKategorieModalComponent = (function () {
    function NeueKategorieModalComponent(_kategorienController, _fb) {
        var _this = this;
        this._kategorienController = _kategorienController;
        this._fb = _fb;
        this.nameIsTaken = true;
        this.namePatternOk = false;
        this.kategorien = new Array();
        this.subscription = this._kategorienController.kategorien$.subscribe(function (kategorien) {
            _this.kategorien = kategorien;
            console.log("hallo");
            console.log(_this.kategorien);
        });
    }
    NeueKategorieModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this._fb.group({
            name: ['']
        });
        var name = this.form.controls['name'];
        name.valueChanges
            .do(function () {
            _this.namePatternOk = false;
            if (!_this.form.controls['name'].value) {
                console.log("doesnt exist");
                _this.form.controls['name'].markAsPristine();
                return;
            }
            if (_this.form.controls['name'].value.length == 0) {
                console.log("marking as pristine");
                _this.form.controls['name'].markAsPristine();
                return;
            }
        })
            .map(function (x) { return x.trim().replace(/ +(?= )/g, ''); })
            .do(function (x) {
            var nameWithoutSpaces = x.replace(/\s/g, '');
            if (nameWithoutSpaces.length < 3) {
                return;
            }
            _this.namePatternOk = true;
        })
            .debounceTime(200).subscribe(function (x) {
            console.log(x);
            if (_this.kategorien.findIndex(function (k) { return k.Name === x; }) != -1) {
                _this.nameIsTaken = true;
                return;
            }
            else {
                _this.nameIsTaken = false;
            }
        });
    };
    NeueKategorieModalComponent.prototype.addKategorie = function () {
        console.log("name");
        var name = this.form.controls['name'].value.trim().replace(/ +(?= )/g, '');
        if (this.kategorien.findIndex(function (x) { return x.Name === name; }) != -1) {
            return;
        }
        var kategorie = new kategorie_1.Kategorie();
        kategorie.Name = name;
        this._kategorienController.addKategorie(kategorie);
        this.clearForm();
    };
    NeueKategorieModalComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    NeueKategorieModalComponent.prototype.clearForm = function () {
        this.form.controls['name'].setValue('');
        this.form.markAsPristine();
    };
    return NeueKategorieModalComponent;
}());
NeueKategorieModalComponent = __decorate([
    core_1.Component({
        selector: 'neue-kategorie-modal',
        templateUrl: '/app/neue-kategorie-modal.component.html',
        styleUrls: ['app/neue-kategorie-modal.component.css']
    }),
    __metadata("design:paramtypes", [kategorien_controller_1.KategorienController, forms_1.FormBuilder])
], NeueKategorieModalComponent);
exports.NeueKategorieModalComponent = NeueKategorieModalComponent;
//# sourceMappingURL=neue-kategorie-modal.component.js.map