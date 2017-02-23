import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Transaktion } from './transaktion';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TransaktionenService {

    private _transaktionenSource: BehaviorSubject<Transaktion[]>;
    public transaktionen$: Observable<Transaktion[]>;

    constructor(private http: Http) {
        console.log("In service constructor");
        this._transaktionenSource = new BehaviorSubject(new Array<Transaktion>());
        this.transaktionen$ = this._transaktionenSource.asObservable();
        this.getData();
    }

    addTransaktion(transaktion: Transaktion) {
    }

    private getData() {
        let obs = this.getAll();

        obs.subscribe(res => {
            let t = this._transaktionenSource.getValue();
            res.map(x => {
                t.push(x);
            });
            this._transaktionenSource.next(t);
        })
    }

    private post(transaktion: Transaktion) {
        console.log("post request sent to server");
    }

    //needs to be moved to different service class
    private getAll(): Observable<Transaktion[]> {
        return this.http
            .get('app/transaktionen.json')
            .map(response => response.json())
            .map(response => response.transaktionen);
    }
}