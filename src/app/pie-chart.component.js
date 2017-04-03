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
var pie_chart_service_1 = require("./pie-chart.service");
var transaktionen_controller_1 = require("./transaktionen.controller");
var PieChartComponent = (function () {
    function PieChartComponent(_kategorienController, _transaktionenController, _pieChartService) {
        this._kategorienController = _kategorienController;
        this._transaktionenController = _transaktionenController;
        this._pieChartService = _pieChartService;
        this.isDataAvailable = false;
        this.kategorien = new Array();
        this.transaktionen = new Array();
        this.options = {
            colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
                '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
                plotBackgroundColor: 'rgba(0, 0, 0, 0.0)',
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                style: {
                    fontFamily: 'Dosis, sans-serif'
                },
                backgroundColor: 'rgba(0,0,0,0)',
            },
            title: {
                text: null
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                backgroundColor: 'rgba(219,219,216,0.8)',
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true
                }
            },
            series: [{
                    name: 'Kategorien',
                    colorByPoint: true,
                    data: null
                }],
            legend: {
                itemStyle: {
                    fontWeight: 'bold',
                    fontSize: '13px'
                }
            },
            credits: {
                enabled: false
            },
        };
        //setInterval(() => this.chart.series[0].addPoint(Math.random() * 10), 20000);
    }
    PieChartComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.chart.setSize(200, 200, true);
        this._transaktionenController.transaktionen$.subscribe(function (transaktionen) {
            _this.transaktionen = transaktionen;
            if (_this.transaktionen.length > 0 && _this.kategorien.length > 0) {
                _this.setChartData();
            }
        });
        this._kategorienController.kategorien$.subscribe(function (kategorien) {
            _this.kategorien = kategorien;
            if (_this.transaktionen.length > 0 && _this.kategorien.length > 0) {
                _this.setChartData();
            }
        });
    };
    PieChartComponent.prototype.setChartData = function () {
        console.log("setting pie chart data");
        console.log(this.kategorien);
        console.log(this.transaktionen);
        var labelsAndData = this._pieChartService.getPieChartLabelsAndData(this.kategorien, this.transaktionen);
        var data = labelsAndData.map(function (x) { return x.AnzahlTransaktionen; });
        var labels = labelsAndData.map(function (x) { return x.KategorieName; });
        this.options = {
            colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
                '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                style: {
                    fontFamily: 'Dosis, sans-serif'
                }
            },
            title: {
                text: null
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                backgroundColor: 'rgba(219,219,216,0.8)',
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true
                }
            },
            series: [{
                    name: 'Kategorien',
                    colorByPoint: true,
                    data: labelsAndData
                }],
            legend: {
                itemStyle: {
                    fontWeight: 'bold',
                    fontSize: '13px'
                }
            },
        };
        this.isDataAvailable = true;
        this.chart.update(this.options, false);
        this.chart.redraw();
        console.log(labelsAndData.map(function (x) { return x.AnzahlTransaktionen; }));
        //this.pieChartLabels = labelsAndData.map(x => x.AnzahlTransaktionen);
    };
    PieChartComponent.prototype.saveInstance = function (chartInstance) {
        this.chart = chartInstance;
    };
    return PieChartComponent;
}());
PieChartComponent = __decorate([
    core_1.Component({
        selector: 'pie-chart',
        templateUrl: '/app/pie-chart.component.html',
        styleUrls: ['./app/pie-chart.component.css']
    }),
    __metadata("design:paramtypes", [kategorien_controller_1.KategorienController, transaktionen_controller_1.TransaktionenController, pie_chart_service_1.PieChartService])
], PieChartComponent);
exports.PieChartComponent = PieChartComponent;
//# sourceMappingURL=pie-chart.component.js.map