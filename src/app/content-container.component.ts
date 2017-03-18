import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { KategorienController } from './kategorien.controller';
import { Kategorie } from './kategorie';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'content-container',
    templateUrl: '/app/content-container.component.html',
    styleUrls: ['app/content-container.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ContentContainerComponent implements OnInit {

    constructor(private _kategorienController: KategorienController) { }

    ngOnInit(): void {
    }

    //Nur um was zu testen....
    onDelete() {
        this._kategorienController.deleteKategorie(7);
    }

    onPost() {
        let kategorie = new Kategorie();

        var random = Math.random() * 10;
        kategorie.Name = "Hallooooooo" + random;

        this._kategorienController.addKategorie(kategorie);
    }

    onUpdate() {


        let kategorie = new Kategorie();
        kategorie.KategorieId = 1;
        kategorie.Name = "halllooooooooooooo";

        this._kategorienController.updateKategorie(kategorie);
    }
}