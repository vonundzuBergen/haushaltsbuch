import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { KategorienController } from './kategorien.controller';
import { Kategorie } from './kategorie';
import { Observable } from 'rxjs/Observable';
import { Transaktion } from './transaktion';
import { TransaktionenController } from './transaktionen.controller';

@Component({
    selector: 'content-container',
    templateUrl: '/app/content-container.component.html',
    styleUrls: ['app/content-container.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ContentContainerComponent implements OnInit {

    ngOnInit(): void {
    }
}   