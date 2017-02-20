import { Component } from '@angular/core';

@Component({
    selector: 'pie-chart',
    templateUrl: '/app/pie-chart.component.html'
})
export class PieChartComponent {
    // Pie
    public pieChartLabels: string[] = ['Fett', 'Larrys', 'Behindert'];
    public pieChartData: number[] = [10, 5, 15];
    public pieChartType: string = 'pie';

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
