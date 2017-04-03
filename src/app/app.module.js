"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var content_container_component_1 = require("./content-container.component");
var neue_transaktion_modal_component_1 = require("./neue-transaktion-modal.component");
var transaktionen_tabelle_component_1 = require("./transaktionen-tabelle.component");
var pie_chart_component_1 = require("./pie-chart.component");
var ng2_charts_1 = require("ng2-charts");
var mydatepicker_1 = require("mydatepicker");
var transaktionen_service_1 = require("./transaktionen.service");
var cashflow_overview_panel_component_1 = require("./cashflow-overview-panel.component");
var line_chart_component_1 = require("./line-chart.component");
var line_chart_service_1 = require("./line-chart.service");
var kategorien_service_1 = require("./kategorien.service");
var cashflow_overview_panel_service_1 = require("./cashflow-overview-panel.service");
var transaktionen_controller_1 = require("./transaktionen.controller");
var kategorien_controller_1 = require("./kategorien.controller");
var neue_kategorie_modal_component_1 = require("./neue-kategorie-modal.component");
var neue_transaktion_modal_service_1 = require("./neue-transaktion-modal.service");
var pie_chart_service_1 = require("./pie-chart.service");
var wiederkehrende_transaktionen_tabelle_component_1 = require("./wiederkehrende-transaktionen-tabelle.component");
var wiederkehrende_transaktionen_service_1 = require("./wiederkehrende-transaktionen.service");
var wiederkehrende_transaktionen_controller_1 = require("./wiederkehrende-transaktionen.controller");
var kategorien_panel_component_1 = require("./kategorien-panel.component");
var ngx_popover_1 = require("ngx-popover");
var getNameOfKategoriePipe_1 = require("./getNameOfKategoriePipe");
var loading_service_1 = require("./loading.service");
var info_box_component_1 = require("./info-box.component");
var info_box_service_1 = require("./info-box.service");
var checkEndDatePipe_1 = require("./checkEndDatePipe");
var angular2_highcharts_1 = require("angular2-highcharts");
var core_2 = require("@angular/core");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [angular2_highcharts_1.ChartModule.forRoot(require('highcharts')), ngx_popover_1.PopoverModule, platform_browser_1.BrowserModule, ng2_charts_1.ChartsModule, router_1.RouterModule, mydatepicker_1.MyDatePickerModule, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
        declarations: [checkEndDatePipe_1.CheckEndDatePipe, info_box_component_1.InfoBoxComponent, getNameOfKategoriePipe_1.GetNameOfKategoriePipe, kategorien_panel_component_1.KategorienPanelComponent, wiederkehrende_transaktionen_tabelle_component_1.WiederkehrendeTransaktionenTabelleComponent, app_component_1.AppComponent, content_container_component_1.ContentContainerComponent, neue_transaktion_modal_component_1.NeueTransaktionModalComponent, transaktionen_tabelle_component_1.TransaktionenTabelleComponent, pie_chart_component_1.PieChartComponent, cashflow_overview_panel_component_1.CashflowOverviewPanelComponent, line_chart_component_1.LineChartComponent, neue_kategorie_modal_component_1.NeueKategorieModalComponent],
        providers: [{ provide: core_2.LOCALE_ID, useValue: "de-DE" }, common_1.DatePipe, info_box_service_1.InfoBoxService, loading_service_1.LoadingService, wiederkehrende_transaktionen_controller_1.WiederkehrendeTransaktionenController, wiederkehrende_transaktionen_service_1.WiederkehrendeTransaktionenService, pie_chart_service_1.PieChartService, transaktionen_service_1.TransaktionenService, kategorien_service_1.KategorienService, line_chart_service_1.LineChartService, cashflow_overview_panel_service_1.CashflowOverviewPanelService, transaktionen_controller_1.TransaktionenController, kategorien_controller_1.KategorienController, neue_transaktion_modal_service_1.NeueTransaktionModalService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map