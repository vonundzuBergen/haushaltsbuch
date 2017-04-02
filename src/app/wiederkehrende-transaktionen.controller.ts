import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { WiederkehrendeTransaktion } from './wiederkehrende-transaktion';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { WiederkehrendeTransaktionenService } from './wiederkehrende-transaktionen.service';
import { LoadingService } from './loading.service';

@Injectable()
export class WiederkehrendeTransaktionenController {

    private _transaktionenSource: BehaviorSubject<WiederkehrendeTransaktion[]>;
    public transaktionen$: Observable<WiederkehrendeTransaktion[]>;

    constructor(private _transaktionenService: WiederkehrendeTransaktionenService, private _loadingService: LoadingService) {
        this._transaktionenSource = new BehaviorSubject(new Array<WiederkehrendeTransaktion>());
        this.transaktionen$ = this._transaktionenSource.asObservable();
        this.getAllTransaktionen();
    }

    addTransaktion(transaktion: WiederkehrendeTransaktion) {
        this._loadingService.showLoading(true);

        let obs = this._transaktionenService.post(transaktion);

        obs.subscribe(res => {
            let t: WiederkehrendeTransaktion[] = this._transaktionenSource.getValue();

            transaktion.ZukuenftigeTransaktionId = res.ZukuenftigeTransaktionId;

            t.push(transaktion);
            this._transaktionenSource.next(t);

            this._loadingService.showLoading(false);

        }, (error) => {
            console.log(error);
            this._loadingService.showLoading(false);
        });
    }

    updateTransaktion(transaktion: WiederkehrendeTransaktion) {
        this._loadingService.showLoading(true);

        let obs = this._transaktionenService.put(transaktion);

        obs.subscribe(res => {
            let t = this._transaktionenSource.getValue();
            let index = t.map(x => x.ZukuenftigeTransaktionId).indexOf(transaktion.ZukuenftigeTransaktionId, 0);
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
        this._loadingService.showLoading(true);

        let obs = this._transaktionenService.delete(id);

        obs.subscribe(res => {
            let t = this._transaktionenSource.getValue();
            let index = t.map(x => x.ZukuenftigeTransaktionId).indexOf(id, 0);
            t.splice(index, 1);
            this._transaktionenSource.next(t);

            this._loadingService.showLoading(false);

        }, (error) => {
            console.log(error);
            this._loadingService.showLoading(false);
        });
    }

    getAllTransaktionen() {
        this._loadingService.showLoading(true);

        let obs = this._transaktionenService.getAll();

        obs.subscribe(res => {
            let t = new Array<WiederkehrendeTransaktion>();
            res.map(x => {
                t.push(x);
            });
            this._transaktionenSource.next(t);
            console.log(t);
            this._loadingService.showLoading(false);
        }, (error) => {
            console.log(error);
            this._loadingService.showLoading(false);
        });
    }
}