import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
import { NeueTransaktionModalService } from './neue-transaktion-modal.service';
import { PieChartService } from './pie-chart.service';
import { WiederkehrendeTransaktionenTabelleComponent } from './wiederkehrende-transaktionen-tabelle.component';
import { WiederkehrendeTransaktionenService } from './wiederkehrende-transaktionen.service';
import { WiederkehrendeTransaktionenController } from './wiederkehrende-transaktionen.controller';
import { KategorienPanelComponent } from './kategorien-panel.component';
import { PopoverModule } from 'ngx-popover';
import { GetNameOfKategoriePipe } from './getNameOfKategoriePipe';
import { LoadingService } from './loading.service';
import { InfoBoxComponent } from './info-box.component';
import { InfoBoxService } from './info-box.service';
import { CheckEndDatePipe } from './checkEndDatePipe';
import { ChartModule } from 'angular2-highcharts';
import { LOCALE_ID } from '@angular/core';

@NgModule({
  imports: [ChartModule.forRoot(require('highcharts')), PopoverModule, BrowserModule, ChartsModule, RouterModule, MyDatePickerModule, HttpModule, FormsModule, ReactiveFormsModule],
  declarations: [CheckEndDatePipe, InfoBoxComponent, GetNameOfKategoriePipe, KategorienPanelComponent, WiederkehrendeTransaktionenTabelleComponent, AppComponent, ContentContainerComponent, NeueTransaktionModalComponent, TransaktionenTabelleComponent, PieChartComponent, CashflowOverviewPanelComponent, LineChartComponent, NeueKategorieModalComponent],
  providers: [{ provide: LOCALE_ID, useValue: "de-DE" }, DatePipe, InfoBoxService, LoadingService, WiederkehrendeTransaktionenController, WiederkehrendeTransaktionenService, PieChartService, TransaktionenService, KategorienService, LineChartService, CashflowOverviewPanelService, TransaktionenController, KategorienController, NeueTransaktionModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }

