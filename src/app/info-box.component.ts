import { Component, OnInit } from '@angular/core';
import { InfoBoxService } from './info-box.service';
declare var $: any;

@Component({
  selector: 'info-box',
  templateUrl: '/app/info-box.component.html',
  styleUrls: ['app/kategorien-panel.component.css']
})
export class InfoBoxComponent {

  constructor(private _infoBoxService: InfoBoxService) {
    this._infoBoxService.showError$.subscribe(x => {
      this.showInfoBox(x);
    });
  }

  private showInfoBox(show: Boolean) {
    console.log("in showInfoBox");
    $("#infoModal").modal("show");
  }
}
