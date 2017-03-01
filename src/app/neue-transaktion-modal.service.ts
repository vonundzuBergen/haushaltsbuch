import { Injectable } from '@angular/core';
import { Transaktion } from './transaktion';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NeueTransaktionModalService {

    private _transaktionSource: Subject<Transaktion>;
    public transaktion$: Observable<Transaktion>;

    constructor(){
        this._transaktionSource = new Subject();
        this.transaktion$ = this._transaktionSource.asObservable();
    }

    updateTransaktion(transaktion: Transaktion) {
        this._transaktionSource.next(transaktion);
    }
}