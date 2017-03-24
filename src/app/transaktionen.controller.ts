import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Transaktion } from './transaktion';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { TransaktionenService } from './transaktionen.service';
import { LoadingService } from './loading.service';

@Injectable()
export class TransaktionenController {

    private _transaktionenSource: BehaviorSubject<Transaktion[]>;
    public transaktionen$: Observable<Transaktion[]>;

    constructor(private _transaktionenService: TransaktionenService, private _loadingService: LoadingService) {
        this._transaktionenSource = new BehaviorSubject(new Array<Transaktion>());
        this.transaktionen$ = this._transaktionenSource.asObservable();
        this.getAllTransaktionen();
    }

    addTransaktion(transaktion: Transaktion) {
        let obs = this._transaktionenService.post(transaktion);

        obs.subscribe(res => {
            let obs = this._transaktionenService.put(transaktion);

            let t: Transaktion[] = this._transaktionenSource.getValue();

            transaktion.TransaktionId = res.TransaktionId;

            console.log(res.TransaktionId);
            console.log(res.KategorieId);
            console.log(t);

            t.push(transaktion);
            this._transaktionenSource.next(t);

            this._loadingService.showLoading(false);

        }, (error) => {
            console.log(error);
            this._loadingService.showLoading(false);
        });
    }

    updateTransaktion(transaktion: Transaktion) {
        let obs = this._transaktionenService.put(transaktion);

        obs.subscribe(res => {
            this._loadingService.showLoading(true);

            let t = this._transaktionenSource.getValue();
            let index = t.map(x => x.TransaktionId).indexOf(transaktion.TransaktionId, 0);
            t.splice(index, 1);
            t.push(transaktion);
            this._transaktionenSource.next(t);
            this._loadingService.showLoading(false);

        }, (error) => {
            console.log(error);
            this._loadingService.showLoading(false);
        });
    }

    deleteTransaktion(id: number) {
        let obs = this._transaktionenService.delete(id);

        obs.subscribe(res => {
            this._loadingService.showLoading(true);

            let t = this._transaktionenSource.getValue();

            let index = t.map(x => x.TransaktionId).indexOf(id, 0);
            t.splice(index, 1);

            this._transaktionenSource.next(t);

            this._loadingService.showLoading(false);

        }, (error) => {
            console.log(error);
            this._loadingService.showLoading(false);
        });
    }

    getAllTransaktionen() {
        let obs = this._transaktionenService.getAll();

        obs.subscribe(res => {
            this._loadingService.showLoading(true);

            let t = new Array<Transaktion>();
            res.map(x => {
                x.Datum = x.Datum
                t.push(x);
            });
            this._transaktionenSource.next(t);

            this._loadingService.showLoading(false);
        }, (error) => {
            console.log(error);
            this._loadingService.showLoading(false);
        });
    }
}