import { Component, ViewChild, SimpleChanges, SimpleChange, OnInit, AfterViewInit } from '@angular/core';
import { KategorienController } from './kategorien.controller';
import { Kategorie } from './kategorie';
import { Transaktion } from './transaktion';
import { PieChartService } from './pie-chart.service';
import { TransaktionenController } from './transaktionen.controller';
//import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartModule } from 'angular2-highcharts';
declare var $: any;

@Component({
    selector: 'pie-chart',
    templateUrl: '/app/pie-chart.component.html',
    styleUrls: ['./app/pie-chart.component.css']
})
export class PieChartComponent implements AfterViewInit {

    chart: any;
    options: Object;
    kategorien: Array<Kategorie>;
    transaktionen: Array<Transaktion>;
    isDataAvailable: Boolean;

    constructor(private _kategorienController: KategorienController, private _transaktionenController: TransaktionenController, private _pieChartService: PieChartService) {
        this.isDataAvailable = false;

        this.kategorien = new Array<Kategorie>();
        this.transaktionen = new Array<Transaktion>();

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
        }

        //setInterval(() => this.chart.series[0].addPoint(Math.random() * 10), 20000);
    }

    ngAfterViewInit() {
        this.chart.setSize(200, 200, true);

        this._transaktionenController.transaktionen$.subscribe(
            transaktionen => {
                this.transaktionen = transaktionen;

                if (this.transaktionen.length > 0 && this.kategorien.length > 0) {
                    this.setChartData();
                }
            });

        this._kategorienController.kategorien$.subscribe(
            kategorien => {
                this.kategorien = kategorien;

                if (this.transaktionen.length > 0 && this.kategorien.length > 0) {
                    this.setChartData();
                }
            });
    }

    setChartData() {
        console.log("setting pie chart data");
        console.log(this.kategorien);
        console.log(this.transaktionen);
        let labelsAndData = this._pieChartService.getPieChartLabelsAndData(this.kategorien, this.transaktionen);
        let data: number[] = labelsAndData.map(x => x.AnzahlTransaktionen)
        let labels: string[] = labelsAndData.map(x => x.KategorieName);

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
        }

        this.isDataAvailable = true;

        this.chart.update(this.options, false);
        this.chart.redraw();
        console.log(labelsAndData.map(x => x.AnzahlTransaktionen));
        //this.pieChartLabels = labelsAndData.map(x => x.AnzahlTransaktionen);
    }

    saveInstance(chartInstance: any) {
        this.chart = chartInstance;
    }


    /*
    // Pie
    public pieChartLabels: string[];
    public pieChartData: number[];
    public pieChartType: string = 'pie';
    public pieChartOptions: any = {
        responsive: true
    };

    isKategorienLoading: Boolean;
    isTransaktionenLoading: Boolean;
    isDataAvaiable: Boolean;
    isViewInitialized: Boolean;
    kategorien: Array<Kategorie>;
    transaktionen: Array<Transaktion>;

    constructor(private _kategorienController: KategorienController, private _transaktionenController: TransaktionenController, private _pieChartService: PieChartService) {
        this.pieChartLabels = new Array<string>(5).fill("Hallo");
        this.pieChartData = new Array<number>(5).fill(5);

        this.isDataAvaiable = false;
        this.isViewInitialized = false;
        this.kategorien = new Array<Kategorie>();
        this.transaktionen = new Array<Transaktion>();
        this.isKategorienLoading = false;
        this.isTransaktionenLoading = false;
    }

    public ngOnInit() {

        this.isViewInitialized = true;

        this._transaktionenController.transaktionen$.subscribe(
            transaktionen => {
                this.isKategorienLoading = true;

                this.transaktionen = transaktionen;


                if (this.transaktionen.length > 0 && this.kategorien.length > 0) {
                    this.setChartData();
                }

                this.isKategorienLoading = false;
                this.isDataAvaiable = true;
            }
        )

        this._kategorienController.kategorien$.subscribe(
            kategorien => {
                this.isTransaktionenLoading = true;
                this.isDataAvaiable = false;

                this.kategorien = kategorien;

                if (this.transaktionen.length > 0 && this.kategorien.length > 0) {
                    this.setChartData();
                }
                this.isTransaktionenLoading = false;
                this.isDataAvaiable = true;
            });
    }

    

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    /*
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.isViewInitialized) {
            console.log("in ngOnChanges");
            setTimeout(function () {
                this.chart.chart.update();
            }, 50);
        }
    }
    */
}
