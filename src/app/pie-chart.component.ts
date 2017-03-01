import { Component, ViewChild, SimpleChange } from '@angular/core';
import { KategorienController } from './kategorien.controller';
import { Kategorie } from './kategorie';
import { Transaktion } from './transaktion';
import { PieChartService } from './pie-chart.service';
import { TransaktionenController } from './transaktionen.controller';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
    selector: 'pie-chart',
    templateUrl: '/app/pie-chart.component.html'
})
export class PieChartComponent {
    // Pie
    public pieChartLabels: string[];
    public pieChartData: number[];
    public pieChartType: string = 'pie';

    kategorien: Array<Kategorie>;
    transaktionen: Array<Transaktion>;

    constructor(private _kategorienController: KategorienController, private _transaktionenController: TransaktionenController, private _pieChartService: PieChartService) {
        this.pieChartLabels = new Array<string>(5).fill('hallo');
        this.pieChartData = new Array<number>(5).fill(3);
        this.kategorien = new Array<Kategorie>();
        this.transaktionen = new Array<Transaktion>();

        _transaktionenController.transaktionen$.subscribe(
            transaktionen => {
                for (var t of transaktionen) {
                    this.transaktionen.push(t);
                }

                this.pieChartLabels = ['jan', 'hat', 'keine lust mehr'];
                this.pieChartData = [1, 2, 3];


                this.pieChartLabels = ['christian', 'j', 'bergen'];
                this.pieChartData = [1, 2, 3];

                this.pieChartLabels = this._pieChartService.getPieChartLabels(this.kategorien);
                this.pieChartData = this._pieChartService.getPieChartData(this.kategorien, this.transaktionen);

                console.log(this.pieChartLabels);
                console.log(this.pieChartData);

            }
        )

        _kategorienController.kategorien$.subscribe(
            kategorien => {
                for (var t of kategorien) {
                    this.kategorien.push(t);
                }

                this.pieChartLabels = this._pieChartService.getPieChartLabels(this.kategorien);
                this.pieChartData = this._pieChartService.getPieChartData(this.kategorien, this.transaktionen);

                console.log(this.pieChartLabels);
                console.log(this.pieChartData);
            }
        );
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        this.chart.chart.update();
    }
}
