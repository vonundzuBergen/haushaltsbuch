import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContentContainerComponent } from './content-container.component';
import { NeueTransaktionModalComponent } from './neue-transaktion-modal.component';
import { TransaktionenTabelleComponent } from './transaktionen-tabelle.component';
import { PieChartComponent } from './pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { MyDatePickerModule } from 'mydatepicker';
import { TransaktionenService } from './transaktionen.service';
import { CashflowOverviewPanelComponent } from './cashflow-overview-panel.component';
import { LineChartComponent } from './line-chart.component';
import { LineChartService } from './line-chart.service';
import { KategorienService } from './kategorien.service';
import { CashflowOverviewPanelService } from './cashflow-overview-panel.service';
import { TransaktionenController } from './transaktionen.controller';
import { KategorienController } from './kategorien.controller';
import { NeueKategorieModalComponent } from './neue-kategorie-modal.component';

@NgModule({
  imports: [BrowserModule, ChartsModule, RouterModule, MyDatePickerModule, HttpModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, ContentContainerComponent, NeueTransaktionModalComponent, TransaktionenTabelleComponent, PieChartComponent, CashflowOverviewPanelComponent, LineChartComponent, NeueKategorieModalComponent],
  providers: [TransaktionenService, KategorienService, LineChartService, CashflowOverviewPanelService, TransaktionenController, KategorienController],
  bootstrap: [AppComponent]
})
export class AppModule { }
