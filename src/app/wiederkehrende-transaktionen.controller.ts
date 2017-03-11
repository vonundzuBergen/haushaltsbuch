import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { WiederkehrendeTransaktion } from './wiederkehrende-transaktion';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { WiederkehrendeTransaktionenService } from './wiederkehrende-transaktionen.service';

@Injectable()
export class WiederkehrendeTransaktionenController {

    private _transaktionenSource: BehaviorSubject<WiederkehrendeTransaktion[]>;
    public transaktionen$: Observable<WiederkehrendeTransaktion[]>;

    constructor(private _transaktionenService: WiederkehrendeTransaktionenService) {
        this._transaktionenSource = new BehaviorSubject(new Array<WiederkehrendeTransaktion>());
        this.transaktionen$ = this._transaktionenSource.asObservable();
        this.getAllTransaktionen();
    }

    addTransaktion(transaktion: WiederkehrendeTransaktion) {
        let obs = this._transaktionenService.post(transaktion);

        obs.subscribe(res => {
            let t = this._transaktionenSource.getValue();
            t.push(transaktion);
            this._transaktionenSource.next(t);
        });
    }

    updateTransaktion(transaktion: WiederkehrendeTransaktion) {
        let obs = this._transaktionenService.put(transaktion);

        obs.subscribe(res => {
            let t = this._transaktionenSource.getValue();
            let index = t.map(x => x.id).indexOf(transaktion.id, 0);
            t.splice(index, 1);
            t.push(transaktion);
            this._transaktionenSource.next(t);
        });
    }

    deleteTransaktion(id: number) {
        let obs = this._transaktionenService.delete(id);

        obs.subscribe(res => {
            let t = this._transaktionenSource.getValue();
            let index = t.map(x => x.id).indexOf(id, 0);
            t.splice(index, 1);
            this._transaktionenSource.next(t);
        });
    }

    getAllTransaktionen() {
        let obs = this._transaktionenService.getAll();

        obs.subscribe(res => {
            let t = this._transaktionenSource.getValue();
            res.map(x => {
                t.push(x);
            });
            this._transaktionenSource.next(t);
        })
    }
}