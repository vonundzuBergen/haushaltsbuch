import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { TransaktionenService } from './transaktionen.service';
import { Transaktion } from './transaktion';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'content-container',
    templateUrl: '/app/content-container.component.html',
    styleUrls: ['app/content-container.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ContentContainerComponent implements OnInit {

    //constructor(private _transaktionenService: TransaktionenService) { }

    ngOnInit(): void {
    }
}