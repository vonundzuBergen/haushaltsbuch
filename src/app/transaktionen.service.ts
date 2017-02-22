import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Transaktion } from './transaktion';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TransaktionenService {

    //Observable source
    private transaktionenSource: Subject<any>;

    //Observable stream
    transaktionen$: Observable<any>;

    constructor(private http: Http) {
        this.transaktionenSource = new Subject<any>();
        this.transaktionen$ = this.transaktionenSource.asObservable();
        this.getAll();
    }

    addTransaktion(transaktion: Transaktion) {
        this.transaktionenSource.next(transaktion);
        this.post(transaktion);
    }

    private getAll() {
        return this.http
            .get('app/transaktionen.json')
            .map(response => response.json())
            .subscribe(response => {
                this.transaktionenSource.next(response['transaktionen']);
            });
    }

    private post(transaktion: Transaktion) {
        console.log("post request sent to server");
    }
}