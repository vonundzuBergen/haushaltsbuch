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
var forms_1 = require("@angular/forms");
var kategorien_controller_1 = require("./kategorien.controller");
var transaktion_1 = require("./transaktion");
var transaktionen_controller_1 = require("./transaktionen.controller");
var neue_transaktion_modal_service_1 = require("./neue-transaktion-modal.service");
var wiederkehrende_transaktion_1 = require("./wiederkehrende-transaktion");
var wiederkehrende_transaktionen_controller_1 = require("./wiederkehrende-transaktionen.controller");
var NeueTransaktionModalComponent = (function () {
    function NeueTransaktionModalComponent(_wiederkehrendeTransaktionenController, _transaktionenController, _kategorienController, _fb, _neueTransaktionModalService) {
        var _this = this;
        this._wiederkehrendeTransaktionenController = _wiederkehrendeTransaktionenController;
        this._transaktionenController = _transaktionenController;
        this._kategorienController = _kategorienController;
        this._fb = _fb;
        this._neueTransaktionModalService = _neueTransaktionModalService;
        this.transaktionsTypen = [
            'Einnahme',
            'Ausgabe'
        ];
        this.transaktionsHaeufigkeiten = [
            'Einmalig',
            'Täglich',
            'Wöchentlich',
            'Monatlich'
        ];
        this.isUpdateTransaktion = false;
        this.isUpdateZukuenftigeTransaktion = false;
        this.isZukuenftigeZahlung = false;
        this.isWiederkehrendeZahlung = false;
        this.kategorien = new Array();
        this.selectedTransaktionsTyp = this.transaktionsTypen[0];
        this.selectedTransaktionsHaeufigkeit = this.transaktionsHaeufigkeiten[0];
        this.hasEndDatum = false;
        var currentDate = new Date();
        this.currentDateObject = {
            date: {
                year: currentDate.getFullYear(),
                month: currentDate.getMonth() + 1,
                day: currentDate.getDate()
            }
        };
        this.myStartDatePickerOptions = {
            inline: false,
            editableDateField: false,
            showClearDateBtn: false,
            showTodayBtn: true,
            markCurrentDay: true,
            dateFormat: 'dd mmm yyyy',
        };
        this.myEndDatePickerOptions = {
            inline: false,
            editableDateField: false,
            showClearDateBtn: false,
            dateFormat: 'dd mmm yyyy',
            disableUntil: { year: this.currentDateObject.date.year, month: this.currentDateObject.date.month, day: this.currentDateObject.date.day }
        };
        this.transaktionSubscription = this._neueTransaktionModalService.transaktion$.subscribe(function (transaktion) { return _this.populateFormWithTransaktion(transaktion); });
        this.wiederkehrendeTransaktionSubscription = this._neueTransaktionModalService.wiederkehrendeTransaktion$.subscribe(function (transaktion) { return _this.populateFormWithZukuenftigeTransaktion(transaktion); });
        var betragRegex = /^\d+((,|.)\d{1,2})?$/;
        var beschreibungRegex = /^[a-z\d\-_,.\s]+$/i;
        this.form = this._fb.group({
            transaktionsTyp: [''],
            betrag: ['', [forms_1.Validators.required, forms_1.Validators.pattern(betragRegex)]],
            kategorie: [''],
            beschreibung: ['', [forms_1.Validators.required, forms_1.Validators.pattern(beschreibungRegex)]],
            transaktionsHaeufigkeit: ['Einmalig'],
            startDatum: [this.currentDateObject],
            hasEndDatum: [false],
            endDatum: ['',]
        });
        this.kategorienControllerSubscription = this._kategorienController.kategorien$.subscribe(function (kategorien) {
            _this.kategorien = kategorien;
            if (_this.kategorien.length > 0) {
                _this.form.controls['kategorie'].setValue(_this.kategorien[0].Name);
            }
        });
    }
    NeueTransaktionModalComponent.prototype.ngOnInit = function () {
        var self = this;
        $(document).ready(function () {
            $("#neueTransaktionModal").on('hidden.bs.modal', function () { return self.clearForm(); });
        });
    };
    NeueTransaktionModalComponent.prototype.ngOnDestroy = function () {
        this.transaktionSubscription.unsubscribe();
        this.kategorienControllerSubscription.unsubscribe();
        this.transaktionenControllerSubscription.unsubscribe();
        this.wiederkehrendeTransaktionSubscription.unsubscribe();
    };
    NeueTransaktionModalComponent.prototype.populateFormWithTransaktion = function (transaktion) {
        this.isZukuenftigeZahlung = false;
        this.isUpdateZukuenftigeTransaktion = false;
        this.isUpdateTransaktion = true;
        this.updatedTransaktion = transaktion;
        this.selectedTransaktionsTyp = transaktion.IsEinnahme ? 'Einnahme' : 'Ausgabe';
        this.form.controls['betrag'].setValue(transaktion.Betrag.toString());
        var kategorieIndex = this.kategorien.findIndex(function (x) { return x.KategorieId == transaktion.KategorieId; });
        var kategorie = this.kategorien[kategorieIndex];
        this.form.controls['kategorie'].setValue(kategorie.Name);
        this.form.controls['beschreibung'].setValue(transaktion.Beschreibung);
        this.form.controls['transaktionsHaeufigkeit'].setValue(this.transaktionsHaeufigkeiten[0]);
        this.form.controls['startDatum'].setValue({ date: { year: transaktion.Datum.getFullYear(), month: transaktion.Datum.getMonth() + 1, day: transaktion.Datum.getDate() } });
        this.form.markAsTouched();
    };
    NeueTransaktionModalComponent.prototype.populateFormWithZukuenftigeTransaktion = function (transaktion) {
        this.isZukuenftigeZahlung = true;
        this.isUpdateTransaktion = false;
        this.isUpdateZukuenftigeTransaktion = true;
        this.updatedZukuenftigeTransaktion = transaktion;
        this.selectedTransaktionsTyp = transaktion.IsEinnahme ? 'Einnahme' : 'Ausgabe';
        this.form.controls['betrag'].setValue(transaktion.Betrag.toString());
        var kategorieIndex = this.kategorien.findIndex(function (x) { return x.KategorieId == transaktion.KategorieId; });
        var kategorie = this.kategorien[kategorieIndex];
        this.form.controls['kategorie'].setValue(kategorie.Name);
        this.form.controls['beschreibung'].setValue(transaktion.Beschreibung);
        this.form.controls['transaktionsHaeufigkeit'].setValue(this.transaktionsHaeufigkeiten[transaktion.Frequenz]);
        this.form.controls['transaktionsHaeufigkeit'].disable();
        this.form.controls['startDatum'].setValue({ date: { year: transaktion.StartDatum.getFullYear(), month: transaktion.StartDatum.getMonth() + 1, day: transaktion.StartDatum.getDate() } });
        var date = new Date('01/01/2000');
        if (transaktion.EndDatum.getFullYear() == date.getFullYear()) {
            this.hasEndDatum = false;
        }
        else {
            this.hasEndDatum = true;
            this.form.controls['endDatum'].setValue({ date: { year: transaktion.EndDatum.getFullYear(), month: transaktion.EndDatum.getMonth() + 1, day: transaktion.EndDatum.getDate() } });
            console.log("hasEndDatum: " + this.hasEndDatum);
        }
        this.onTransaktionsHaeufigkeitChange(this.form.controls['transaktionsHaeufigkeit'].value);
        this.form.controls['endDatum'].setValue({ date: { year: transaktion.EndDatum.getFullYear(), month: transaktion.EndDatum.getMonth() + 1, day: transaktion.EndDatum.getDate() } });
    };
    NeueTransaktionModalComponent.prototype.clearForm = function () {
        console.log("in clearForm");
        this.selectedTransaktionsTyp = 'Einnahme';
        this.form.controls['betrag'].reset();
        if (this.kategorien.length > 0) {
            this.form.controls['kategorie'].setValue(this.kategorien[0].Name);
        }
        this.form.controls['beschreibung'].reset();
        this.form.controls['transaktionsHaeufigkeit'].setValue(this.transaktionsHaeufigkeiten[0]);
        this.onTransaktionsHaeufigkeitChange(this.form.controls['transaktionsHaeufigkeit'].value);
        this.form.controls['startDatum'].setValue(this.currentDateObject);
        this.SetIsZukuenftigeZahlung(this.currentDateObject);
        this.isUpdateZukuenftigeTransaktion = false;
        this.isUpdateTransaktion = false;
        this.form.controls['transaktionsHaeufigkeit'].enable();
        this.hasEndDatum = false;
    };
    NeueTransaktionModalComponent.prototype.onFocusOut = function () {
        console.log("onFocusOut");
    };
    NeueTransaktionModalComponent.prototype.onTransaktionsTypSelectionChange = function (typ) {
        this.selectedTransaktionsTyp = typ;
        console.log(this.selectedTransaktionsTyp);
    };
    NeueTransaktionModalComponent.prototype.onTransaktionsHaeufigkeitChange = function (h) {
        this.selectedTransaktionsHaeufigkeit = h;
        if (h == 'Einmalig') {
            this.isWiederkehrendeZahlung = false;
            this.hasEndDatum = false;
        }
        else {
            this.isWiederkehrendeZahlung = true;
        }
        var startDatum = this.form.controls['startDatum'].value.date;
        var startDatumAsDate = new Date(startDatum.year, startDatum.month - 1, startDatum.day);
        this.SetDatePickerOptions(startDatumAsDate, h, false);
    };
    // dateChanged callback function called when the user select the date. This is mandatory callback
    // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
    NeueTransaktionModalComponent.prototype.SetIsZukuenftigeZahlung = function (startDate) {
        var dayNow = new Date().getDate();
        var monthNow = new Date().getMonth();
        var yearNow = new Date().getFullYear();
        var dateNow = new Date(yearNow, monthNow, dayNow);
        if (startDate > dateNow) {
            this.isZukuenftigeZahlung = true;
        }
        else {
            this.isZukuenftigeZahlung = false;
        }
    };
    NeueTransaktionModalComponent.prototype.SetDatePickerOptions = function (startDate, frequenz, hasStartDatumChanged) {
        var initialStartDatum;
        var initialStartDatumAsDate;
        if (hasStartDatumChanged) {
            initialStartDatum = startDate;
            initialStartDatumAsDate = new Date(initialStartDatum.getFullYear(), initialStartDatum.getMonth(), initialStartDatum.getDate());
            console.log("initialStartDatumAsDate");
            console.log(initialStartDatumAsDate);
        }
        else {
            initialStartDatum = this.form.controls['startDatum'].value.date;
            initialStartDatumAsDate = new Date(initialStartDatum.year, initialStartDatum.month - 1, initialStartDatum.day);
            console.log("initialStartDatumAsDate");
            console.log(initialStartDatumAsDate);
        }
        if (frequenz != "Einmalig" || this.isZukuenftigeZahlung) {
            var dateNow = new Date();
            var dateNowAsDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
            dateNowAsDate.setDate(dateNowAsDate.getDate() + 1);
            var disableUntilStartDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
            if (initialStartDatumAsDate < dateNowAsDate) {
                this.form.controls['startDatum'].setValue({ date: { day: dateNowAsDate.getDate(), month: dateNowAsDate.getMonth() + 1, year: dateNowAsDate.getFullYear() } });
            }
            var newOptions_1 = JSON.parse(JSON.stringify(this.myStartDatePickerOptions));
            newOptions_1.disableUntil = { day: disableUntilStartDate.getDate(), month: disableUntilStartDate.getMonth() + 1, year: disableUntilStartDate.getFullYear() };
            this.myStartDatePickerOptions = newOptions_1;
        }
        else {
            var newOptions_2 = JSON.parse(JSON.stringify(this.myStartDatePickerOptions));
            newOptions_2.disableUntil = {};
            this.myStartDatePickerOptions = newOptions_2;
        }
        var actualStartDatum = this.form.controls['startDatum'].value.date;
        var actualStartDate = new Date(actualStartDatum.year, actualStartDatum.month - 1, actualStartDatum.day);
        var disableUntilEndDate = initialStartDatumAsDate;
        var newOptions = JSON.parse(JSON.stringify(this.myEndDatePickerOptions));
        if (frequenz === "Täglich") {
            disableUntilEndDate.setMonth(initialStartDatumAsDate.getMonth());
            disableUntilEndDate.setFullYear(initialStartDatumAsDate.getFullYear());
            disableUntilEndDate.setDate(initialStartDatumAsDate.getDate());
        }
        else if (frequenz === "Wöchentlich") {
            disableUntilEndDate.setMonth(initialStartDatumAsDate.getMonth());
            disableUntilEndDate.setFullYear(initialStartDatumAsDate.getFullYear());
            disableUntilEndDate.setDate(initialStartDatumAsDate.getDate() + 6);
        }
        else if (frequenz === "Monatlich") {
            disableUntilEndDate.setDate(initialStartDatumAsDate.getDate() - 1);
            disableUntilEndDate.setFullYear(initialStartDatumAsDate.getFullYear());
            disableUntilEndDate.setMonth(initialStartDatumAsDate.getMonth() + 1);
        }
        newOptions.disableUntil = { day: disableUntilEndDate.getDate(), month: disableUntilEndDate.getMonth() + 1, year: disableUntilEndDate.getFullYear() };
        var setEndDate = disableUntilEndDate;
        setEndDate.setDate(setEndDate.getDate() + 1);
        this.form.controls['endDatum'].setValue({
            date: {
                day: disableUntilEndDate.getDate(), month: disableUntilEndDate.getMonth() + 1, year: disableUntilEndDate.getFullYear()
            }
        });
        this.myEndDatePickerOptions = newOptions;
    };
    NeueTransaktionModalComponent.prototype.onStartDateChanged = function (event) {
        console.log(event.date);
        console.log("onStartDateChanged");
        var endDatum = this.form.controls['endDatum'].value;
        var startDatum = event.date;
        if (startDatum.year === 0 || startDatum.month === 0 || startDatum.day === 0) {
            this.form.controls['endDatum'].reset();
            return;
        }
        var startDatumAsDate = new Date(startDatum.year, startDatum.month - 1, startDatum.day);
        var frequenz = this.form.controls['transaktionsHaeufigkeit'].value;
        this.SetDatePickerOptions(startDatumAsDate, frequenz, true);
    };
    NeueTransaktionModalComponent.prototype.onEndDateChanged = function (event) {
    };
    NeueTransaktionModalComponent.prototype.onSubmit = function () {
        var _this = this;
        var dateNow = new Date();
        var dateNowAsDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
        var startDatum = this.form.controls['startDatum'].value.date;
        var startDatumAsDate = new Date(startDatum.year, startDatum.month - 1, startDatum.day);
        if (dateNowAsDate < startDatumAsDate) {
            var zukuenftigeTransaktion = new wiederkehrende_transaktion_1.WiederkehrendeTransaktion();
            var zukuenftigeTransaktionBetragString = this.form.controls['betrag'].value.toString().replace(',', '.');
            zukuenftigeTransaktion.Betrag = Number.parseFloat(zukuenftigeTransaktionBetragString);
            zukuenftigeTransaktion.IsEinnahme = this.selectedTransaktionsTyp == this.transaktionsTypen[0] ? true : false;
            zukuenftigeTransaktion.Beschreibung = this.form.controls['beschreibung'].value.trim().replace(/ +(?= )/g, '');
            var startDatum_1 = this.form.controls['startDatum'].value.date;
            zukuenftigeTransaktion.StartDatum = new Date(startDatum_1.year, startDatum_1.month - 1, startDatum_1.day);
            var kategorieIndex = this.kategorien.findIndex(function (x) { return x.Name == _this.form.controls['kategorie'].value; });
            zukuenftigeTransaktion.KategorieId = this.kategorien[kategorieIndex].KategorieId;
            zukuenftigeTransaktion.Frequenz = this.transaktionsHaeufigkeiten.findIndex(function (x) { return x === _this.form.controls['transaktionsHaeufigkeit'].value; });
            if (this.hasEndDatum) {
                console.log("hasenddatum: " + this.hasEndDatum);
                var endDatum = this.form.controls['endDatum'].value.date;
                zukuenftigeTransaktion.EndDatum = new Date(endDatum.year, endDatum.month - 1, endDatum.day);
            }
            else {
                zukuenftigeTransaktion.EndDatum = new Date('01/01/2000');
            }
            if (this.isUpdateZukuenftigeTransaktion) {
                zukuenftigeTransaktion.ZukuenftigeTransaktionId = this.updatedZukuenftigeTransaktion.ZukuenftigeTransaktionId;
                console.log("updating zukuenftigeTransaktion");
                console.log(zukuenftigeTransaktion);
                this._wiederkehrendeTransaktionenController.updateTransaktion(zukuenftigeTransaktion);
            }
            else {
                console.log("new zukuenftigeTransaktion");
                console.log(zukuenftigeTransaktion);
                this._wiederkehrendeTransaktionenController.addTransaktion(zukuenftigeTransaktion);
            }
        }
        else {
            var transaktion = new transaktion_1.Transaktion();
            var transaktionBetragString = this.form.controls['betrag'].value.toString().replace(',', '.');
            transaktion.Betrag = Number.parseFloat(transaktionBetragString);
            transaktion.IsEinnahme = this.selectedTransaktionsTyp == this.transaktionsTypen[0] ? true : false;
            transaktion.Beschreibung = this.form.controls['beschreibung'].value.trim().replace(/ +(?= )/g, '');
            var date = this.form.controls['startDatum'].value.date;
            transaktion.Datum = new Date(date.year, date.month - 1, date.day);
            console.log(transaktion.Datum);
            var kategorieIndex = this.kategorien.findIndex(function (x) { return x.Name == _this.form.controls['kategorie'].value; });
            transaktion.KategorieId = this.kategorien[kategorieIndex].KategorieId;
            if (this.isUpdateTransaktion) {
                transaktion.TransaktionId = this.updatedTransaktion.TransaktionId;
                console.log("updating transaktion");
                console.log(transaktion);
                this._transaktionenController.updateTransaktion(transaktion);
            }
            else {
                console.log("new transaktion");
                console.log(transaktion);
                this._transaktionenController.addTransaktion(transaktion);
            }
        }
    };
    NeueTransaktionModalComponent.prototype.onKategorieChanged = function (k) {
        //console.log(this.selectedKategorie);
        //console.log(this.form.controls['kategorie'].value);
        //console.log(k);
    };
    NeueTransaktionModalComponent.prototype.onChangeBetrag = function () {
        console.log(this.form.valid);
    };
    NeueTransaktionModalComponent.prototype.onHasEndDatumChanged = function (value) {
        this.hasEndDatum = this.form.controls['hasEndDatum'].value;
        var frequenz = this.form.controls['transaktionsHaeufigkeit'].value;
        var startDatum = this.form.controls['startDatum'].value.date;
        var startDatumAsDate = new Date(startDatum.year, startDatum.month - 1, startDatum.day);
        this.SetDatePickerOptions(startDatumAsDate, frequenz, false);
    };
    return NeueTransaktionModalComponent;
}());
NeueTransaktionModalComponent = __decorate([
    core_1.Component({
        selector: 'neue-transaktion-modal',
        templateUrl: '/app/neue-transaktion-modal.component.html',
        styleUrls: ['./app/neue-transaktion-modal.component.css']
    }),
    __metadata("design:paramtypes", [wiederkehrende_transaktionen_controller_1.WiederkehrendeTransaktionenController, transaktionen_controller_1.TransaktionenController, kategorien_controller_1.KategorienController, forms_1.FormBuilder, neue_transaktion_modal_service_1.NeueTransaktionModalService])
], NeueTransaktionModalComponent);
exports.NeueTransaktionModalComponent = NeueTransaktionModalComponent;
//# sourceMappingURL=neue-transaktion-modal.component.js.map