import { Component, OnInit } from '@angular/core';
import { LineChartService } from './line-chart.service';
import { TransaktionenController } from './transaktionen.controller';
import { Transaktion } from './transaktion';
import 'rxjs/add/operator/map';
import { ChartModule } from 'angular2-highcharts';
declare var $: any;
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as Highcharts from "highcharts";

@Component({
    selector: 'line-chart',
    templateUrl: '/app/line-chart.component.html',
    styleUrls: ['app/line-chart.component.css']
})
export class LineChartComponent {

    chart: any;
    options: any;
    transaktionen: Array<Transaktion>;
    isDataAvailable: Boolean;

    constructor(private _transaktionenController: TransaktionenController, private _lineChartService: LineChartService) {
        this.isDataAvailable = false;
        this.transaktionen = new Array<Transaktion>();

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
        }

        //setInterval(() => this.chart.series[0].addPoint(Math.random() * 10), 20000);
    }

    ngAfterViewInit() {
        this.chart.setSize(200, 200, true);

        this._transaktionenController.transaktionen$.subscribe(
            transaktionen => {
                this.transaktionen = transaktionen.slice();

                if (this.transaktionen.length > 0) {
                    this.setChartData();
                }
            });
    }

    setChartData() {
        let lineChartData = this._lineChartService.getLineChartData(this.transaktionen);
        let llabels = lineChartData.map(x => x.date);
        let ldata = lineChartData.map(x => x.value);

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
                labels:
                {
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
        }
    }

    saveInstance(chartInstance: any) {
        this.chart = chartInstance;
    }
    /*
        public lineChartData: Array<Array<number>>;
        public lineChartLabels = new Array<any>(10);
        public lineChartType: string;
        public lineChartColors: Array<any>;
        numberOfDaysToDisplay = 10;
    
        constructor(private _lineChartService: LineChartService, private _transaktionenController: TransaktionenController) {
    
            let einnahmenChartData: Array<number> = new Array(10).fill(0);
            let ausgabenChartData: Array<number> = new Array(10).fill(0);
    
            this.lineChartData = new Array<Array<number>>(2);
            this.lineChartData[0] = einnahmenChartData;
            this.lineChartData[1] = ausgabenChartData;
    
            console.log(this.lineChartData.length);
            console.log(this.lineChartData[0].length);
            console.log(this.lineChartData[1].length);
    
            this.lineChartType = 'line';
            this.lineChartColors = [
                { // grey
                    backgroundColor: 'rgba(0, 140, 0, 0.2)',
                    borderColor: 'rgba(0, 140, 0, 1)',
                    pointBackgroundColor: 'rgba(148,159,177,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
                },
                { // grey
                    backgroundColor: 'rgba(205, 0, 0, 0.2)',
                    borderColor: 'rgba(205, 0, 0, 1)',
                    pointBackgroundColor: 'rgba(148,159,177,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
                }];
            _transaktionenController.transaktionen$.subscribe(
                transaktionen => {
                    this.lineChartLabels = this._lineChartService.getLineChartLabels(this.numberOfDaysToDisplay);
                    this._lineChartService.getLineChartData(this.numberOfDaysToDisplay, transaktionen, einnahmenChartData, ausgabenChartData);
                }
            );
        }
    
        ngOnInit(): void {
        }
    
        public chartClicked(e: any): void {
            console.log(e);
        }
    
        public chartHovered(e: any): void {
            console.log(e);
        }
        */
}
