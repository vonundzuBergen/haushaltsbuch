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
        this._loadingService.showLoading(true);

        let obs = this._transaktionenService.post(transaktion);

        obs.subscribe(res => {
            let t: Transaktion[] = this._transaktionenSource.getValue();

            transaktion.TransaktionId = res.TransaktionId;

            t.push(transaktion);
            this._transaktionenSource.next(t);

            this._loadingService.showLoading(false);

        }, (error) => {
            console.log(error);
            this._loadingService.showLoading(false);
        });
    }

    updateTransaktion(transaktion: Transaktion) {
        this._loadingService.showLoading(true);
        let obs = this._transaktionenService.put(transaktion);

        obs.subscribe(res => {

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
        this._loadingService.showLoading(true);

        let obs = this._transaktionenService.delete(id);

        obs.subscribe(res => {
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
        this._loadingService.showLoading(true);

        let obs = this._transaktionenService.getAll();

        obs.subscribe(res => {
            console.log("starting");

            let t = new Array<Transaktion>();
            res.map(x => {
                x.Datum = x.Datum
                t.push(x);
            });
            console.log("fertig");
            console.log(t);

            this._transaktionenSource.next(t);
            this._loadingService.showLoading(false);
        }, (error) => {
            console.log(error);
            this._loadingService.showLoading(false);
        });
    }
    getFilteredTransaktionen(numberOfDays: number) {
        this._loadingService.showLoading(true);

        let obs = this._transaktionenService.getAll();

        obs.subscribe(res => {

            let cutOffDatum: Date = new Date();
            cutOffDatum.setDate(cutOffDatum.getDate() - numberOfDays);
            let cutOffDatumAsDate = new Date(cutOffDatum.getFullYear(), cutOffDatum.getMonth(), cutOffDatum.getDate());

            console.log("cutOffDatumAsDate")
            console.log(cutOffDatumAsDate);

            console.log("starting");
            console.log("cutOffDatumAsDate")
            console.log(cutOffDatumAsDate);
            let t = new Array<Transaktion>();
            res.map(x => {
                if (x.Datum >= cutOffDatumAsDate) {
                    t.push(x);
                } else {
                    console.log(x.Datum)
                    console.log(cutOffDatum)
                }
            });
            console.log("fertig");
            console.log(t);

            this._transaktionenSource.next(t);
            this._loadingService.showLoading(false);
        }, (error) => {
            console.log(error);
            this._loadingService.showLoading(false);
        });
    }
}