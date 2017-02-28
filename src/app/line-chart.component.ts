import { Component, OnInit } from '@angular/core';
import { LineChartService } from './line-chart.service';
import { TransaktionenController } from './transaktionen.controller';
import { Transaktion } from './transaktion';
import 'rxjs/add/operator/map';

@Component({
    selector: 'line-chart',
    templateUrl: '/app/line-chart.component.html',
})
export class LineChartComponent implements OnInit {

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
}
