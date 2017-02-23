import { Component, OnInit } from '@angular/core';
import { LineChartService } from './line-chart.service';
import { TransaktionenService } from './transaktionen.service';
import { Transaktion } from './transaktion';
import 'rxjs/add/operator/map';

@Component({
    selector: 'line-chart',
    templateUrl: '/app/line-chart.component.html',
})
export class LineChartComponent implements OnInit {

    public lineChartData = new Array<any>();
    public lineChartLabels = new Array<any>();
    public lineChartType: string;

    transaktionen: Array<Transaktion>;

    constructor(private _lineChartService: LineChartService, private _transaktionenService: TransaktionenService) {

        this.transaktionen = new Array<Transaktion>();

        _transaktionenService.transaktionen$.subscribe(
            transaktionen => {
                this.lineChartData = this._lineChartService.getLineChartData(transaktionen);
                this.lineChartLabels = this._lineChartService.getLineChartLabels(transaktionen);
            }
        );
    }

    ngOnInit(): void {
        this.lineChartType = 'line';
    }

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
