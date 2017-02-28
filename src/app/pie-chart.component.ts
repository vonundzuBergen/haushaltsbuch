import { Component } from '@angular/core';
import { KategorienController } from './kategorien.controller';
import { Kategorie } from './kategorie';

@Component({
    selector: 'pie-chart',
    templateUrl: '/app/pie-chart.component.html'
})
export class PieChartComponent {
    // Pie
    public pieChartLabels: string[] = ['Fett', 'Larrys', 'Behindert'];
    public pieChartData: number[] = [10, 5, 15];
    public pieChartType: string = 'pie';

    kategorien: Array<Kategorie>;

    constructor(private kategorienController: KategorienController) {
        this.kategorien = new Array<Kategorie>();

        kategorienController.kategorien$.subscribe(
            kategorien => {
                for (var t of kategorien) {
                    this.kategorien.push(t);
                }
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
}
