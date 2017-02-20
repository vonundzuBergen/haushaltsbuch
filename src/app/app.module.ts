import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContentContainerComponent } from './content-container.component';
import { NeueTransaktionModalComponent } from './neue-transaktion-modal.component';
import { TransaktionenTabelleComponent } from './transaktionen-tabelle.component';
import { PieChartComponent } from './pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  imports: [BrowserModule, ChartsModule, RouterModule, MyDatePickerModule],
  declarations: [AppComponent, ContentContainerComponent, NeueTransaktionModalComponent, TransaktionenTabelleComponent, PieChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
