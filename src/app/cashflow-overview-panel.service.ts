import { Injectable } from '@angular/core';
import { Transaktion } from './transaktion';
import 'rxjs/add/operator/map';

@Injectable()
export class CashflowOverviewPanelService {
    getGesamtEinnahmen(transaktionen: Transaktion[]): number {
        let total = 0;
        for (let transaktion of transaktionen) {
            if (transaktion.IsEinnahme) {
                total += transaktion.Betrag;
            }
        }

        return total;
    }

    getGesamtAusgaben(transaktionen: Transaktion[]): number {
        let total = 0;
        for (let transaktion of transaktionen) {
            if (!transaktion.IsEinnahme) {
                total += transaktion.Betrag;
            }
        }

        return total;
    }
}