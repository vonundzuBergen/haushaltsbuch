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
                this.transaktionen = transaktionen;


                let labelsAndData = this._pieChartService.getPieChartLabelsAndData(this.kategorien, this.transaktionen);
                console.log(labelsAndData);


                this.pieChartLabels = labelsAndData.map(x => x.KategorieName);
                this.pieChartData = labelsAndData.map(x => x.AnzahlTransaktionen);

            }
        )

        _kategorienController.kategorien$.subscribe(
            kategorien => {
                this.kategorien = kategorien;

                /*
                let labelsAndData = this._pieChartService.getPieChartLabelsAndData(this.kategorien, this.transaktionen);

                console.log(labelsAndData);

                this.pieChartLabels = labelsAndData.map(x => x.KategorieName);
                this.pieChartData = labelsAndData.map(x => x.AnzahlTransaktionen);
                */
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
