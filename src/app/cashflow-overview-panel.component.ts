import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cashflow-overview-panel',
  templateUrl: '/app/cashflow-overview-panel.component.html',
  styleUrls: ['app/cashflow-overview-panel.component.css']
})
export class CashflowOverviewPanelComponent implements OnInit  { 
      gesamtEinnahmen: number;
      gesamtAusgaben: number;
      gesamtCashflow: number;

      constructor(){
      }

      ngOnInit():void {
        this.gesamtEinnahmen = 33.45;
        this.gesamtAusgaben = -100.67;
        this.gesamtCashflow = this.gesamtEinnahmen- this.gesamtAusgaben;
      }
 }
