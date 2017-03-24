import { Component, OnInit } from '@angular/core';
import { Kategorie } from './kategorie';
import { KategorienController } from './kategorien.controller';

@Component({
  selector: 'kategorien-panel',
  templateUrl: '/app/kategorien-panel.component.html',
  styleUrls: ['app/kategorien-panel.component.css']
})
export class KategorienPanelComponent {

  private kategorien: Kategorie[];

  constructor(private _kategorienController: KategorienController) {
    this.kategorien = new Array<Kategorie>();

    _kategorienController.kategorien$.subscribe(
      kategorien => {
        this.kategorien = kategorien;
      }
    );
  }

  deleteKategorie(kategorie: Kategorie) {
    this._kategorienController.deleteKategorie(kategorie.KategorieId);
  }
}
