import { Component, OnInit } from '@angular/core';
import { Transaktion } from './transaktion';
import { TransaktionenController } from './transaktionen.controller';
import { CashflowOverviewPanelService } from './cashflow-overview-panel.service';

@Component({
  selector: 'cashflow-overview-panel',
  templateUrl: '/app/cashflow-overview-panel.component.html',
  styleUrls: ['app/cashflow-overview-panel.component.css']
})
export class CashflowOverviewPanelComponent implements OnInit {
  gesamtEinnahmen: number;
  gesamtAusgaben: number;
  gesamtCashflow: number;

  constructor(private _transaktionenController: TransaktionenController, private _cashflowService: CashflowOverviewPanelService) {

    _transaktionenController.transaktionen$.subscribe(
      transaktionen => {
        this.gesamtEinnahmen = _cashflowService.getGesamtEinnahmen(transaktionen);
        this.gesamtAusgaben = _cashflowService.getGesamtAusgaben(transaktionen);
        this.gesamtCashflow = this.gesamtEinnahmen - this.gesamtAusgaben;
      }
    );
  }

  ngOnInit(): void {
  }
}
