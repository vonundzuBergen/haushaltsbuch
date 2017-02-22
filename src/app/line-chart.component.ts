import { Component, OnInit } from '@angular/core';
import { LineChartService } from './line-chart.service';
import 'rxjs/add/operator/map';

@Component({
    selector: 'line-chart',
    templateUrl: '/app/line-chart.component.html',
})
export class LineChartComponent implements OnInit {

    public lineChartData: Array<any>;
    public lineChartLabels: Array<any>;
    public lineChartType: string;


    constructor(private _lineChartService: LineChartService) {

    }

    ngOnInit(): void {

        this.lineChartData = this._lineChartService.getLineChartData();
        this.lineChartLabels = this._lineChartService.getLineChartLabels();
        this.lineChartType = 'line';
    }

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
