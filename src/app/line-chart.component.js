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
var line_chart_service_1 = require("./line-chart.service");
var transaktionen_controller_1 = require("./transaktionen.controller");
require("rxjs/add/operator/map");
var LineChartComponent = (function () {
    function LineChartComponent(_transaktionenController, _lineChartService) {
        this._transaktionenController = _transaktionenController;
        this._lineChartService = _lineChartService;
        this.isDataAvailable = false;
        this.transaktionen = new Array();
        this.options = {
            colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
                '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
                plotBackgroundColor: 'rgba(0, 0, 0, 0.0)',
                plotBorderWidth: null,
                plotShadow: false,
                type: 'line',
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
                chart: {
                    renderTo: 'container',
                    type: 'spline',
                    backgroundColor: {
                        linearGradient: [0, 0, 0, 400],
                        stops: [
                            [0, 'rgb(193, 226, 179)'],
                            [1, 'rgb(193, 226, 179)']
                        ]
                    }
                },
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
    LineChartComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.chart.setSize(200, 200, true);
        this._transaktionenController.transaktionen$.subscribe(function (transaktionen) {
            _this.transaktionen = transaktionen.slice();
            if (_this.transaktionen.length > 0) {
                _this.setChartData();
            }
        });
    };
    LineChartComponent.prototype.setChartData = function () {
        var lineChartData = this._lineChartService.getLineChartData(this.transaktionen);
        var llabels = lineChartData.map(function (x) { return x.date; });
        var ldata = lineChartData.map(function (x) { return x.value; });
        console.log(llabels);
        console.log(ldata);
        //let data: number[] = labelsAndData.map(x => x.AnzahlTransaktionen)
        //let labels: string[] = labelsAndData.map(x => x.KategorieName);
        this.options = {
            yAxis: {
                title: {
                    text: 'Betrag',
                    style: {
                        fontSize: '14px'
                    }
                }
            },
            xAxis: {
                categories: llabels,
                labels: {
                    enabled: false
                }
            },
            title: {
                text: null
            },
            series: [{
                    showInLegend: false,
                    name: 'Cashflow',
                    data: ldata,
                    lineWidth: 8,
                    /*                color: {
                                        linearGradient: {
                                            x1: '#c1e2b3',
                                            x2: '#c1e2b3',
                                            y1: '#c1e2b3',
                                            y2: '#c1e2b3'
                                        },
                                        stops: [
                                            [0, '#c1e2b3'],
                                            [1, '#ebcccc']
                                        ]
                                    },*/
                    zones: [{
                            value: 0,
                            color: '#ebcccc'
                        }, {
                            color: '#c1e2b3'
                        }],
                    marker: {
                        fillColor: '#FFFFFF',
                        lineWidth: 4,
                        lineColor: '#585b57'
                    }
                }]
        };
    };
    LineChartComponent.prototype.saveInstance = function (chartInstance) {
        this.chart = chartInstance;
    };
    return LineChartComponent;
}());
LineChartComponent = __decorate([
    core_1.Component({
        selector: 'line-chart',
        templateUrl: '/app/line-chart.component.html',
        styleUrls: ['app/line-chart.component.css']
    }),
    __metadata("design:paramtypes", [transaktionen_controller_1.TransaktionenController, line_chart_service_1.LineChartService])
], LineChartComponent);
exports.LineChartComponent = LineChartComponent;
//# sourceMappingURL=line-chart.component.js.map