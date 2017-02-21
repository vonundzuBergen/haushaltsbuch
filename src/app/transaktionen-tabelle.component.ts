import { Component, OnInit } from '@angular/core';
import {TransaktionenService} from './transaktionen.service';

@Component({
    selector: 'transaktionen-tabelle',
    templateUrl: '/app/transaktionen-tabelle.component.html',
    styleUrls: ['app/transaktionen-tabelle.component.css']

})
export class TransaktionenTabelleComponent implements OnInit {
    
    transaktionen: Array<any>;

constructor(private service: TransaktionenService){}

    ngOnInit(): void {
        this.transaktionen = this.service.getTransaktionen();
    }
}