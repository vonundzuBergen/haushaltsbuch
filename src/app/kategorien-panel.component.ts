import { Component, OnInit } from '@angular/core';
import { Kategorie } from './kategorie';
import { KategorienController } from './kategorien.controller';
import { Transaktion } from './transaktion';
import { TransaktionenController } from './transaktionen.controller';
import { InfoBoxService } from './info-box.service';
import { WiederkehrendeTransaktion } from './wiederkehrende-transaktion';
import { WiederkehrendeTransaktionenController } from './wiederkehrende-transaktionen.controller';

@Component({
  selector: 'kategorien-panel',
  templateUrl: '/app/kategorien-panel.component.html',
  styleUrls: ['app/kategorien-panel.component.css']
})
export class KategorienPanelComponent {

  private kategorien: Kategorie[];
  private transaktionen: Transaktion[];
  private wiederkehrendeTransaktionen: WiederkehrendeTransaktion[];

  constructor(private _wiederkehrendeTransaktionenController: WiederkehrendeTransaktionenController, private _infoBoxService: InfoBoxService, private _kategorienController: KategorienController, private _transaktionenController: TransaktionenController) {
    this.kategorien = new Array<Kategorie>();
    this.transaktionen = new Array<Transaktion>();

    _kategorienController.kategorien$.subscribe(
      kategorien => {
        this.kategorien = kategorien;
      });

    _transaktionenController.transaktionen$.subscribe(
      transaktionen => {
        this.transaktionen = transaktionen;
      });

    _wiederkehrendeTransaktionenController.transaktionen$.subscribe(
      transaktionen => {
        this.wiederkehrendeTransaktionen = transaktionen;
      }
    )
  }

  deleteKategorie(kategorie: Kategorie) {

    console.log("in deleteKategorie");

    let transaktionenIndex = this.transaktionen.findIndex(x => x.KategorieId == kategorie.KategorieId);
    let wiederkehrendeTransaktionenIndex = this.wiederkehrendeTransaktionen.findIndex(x => x.KategorieId == kategorie.KategorieId);

    if (transaktionenIndex != -1 || wiederkehrendeTransaktionenIndex != -1) {
      this._infoBoxService.showInfoBox(true);
      return;
    }

    this._kategorienController.deleteKategorie(kategorie.KategorieId);
  }
}
