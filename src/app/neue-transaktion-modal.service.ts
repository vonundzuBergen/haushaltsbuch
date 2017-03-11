import { Injectable } from '@angular/core';
import { Transaktion } from './transaktion';
import { WiederkehrendeTransaktion } from './wiederkehrende-transaktion';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NeueTransaktionModalService {

    private _transaktionSource: Subject<Transaktion>;
    private _wiederkehrendeTransaktionSource: Subject<WiederkehrendeTransaktion>;
    public transaktion$: Observable<Transaktion>;
    public wiederkehrendeTransaktion$: Observable<WiederkehrendeTransaktion>;

    constructor() {
        this._transaktionSource = new Subject();
        this._wiederkehrendeTransaktionSource = new Subject();

        this.transaktion$ = this._transaktionSource.asObservable();
        this.wiederkehrendeTransaktion$ = this._wiederkehrendeTransaktionSource.asObservable();
    }

    updateTransaktion(transaktion: Transaktion) {
        this._transaktionSource.next(transaktion);
    }

    updateWiederkehrendeTransation(transaktion: WiederkehrendeTransaktion) {
        this._wiederkehrendeTransaktionSource.next(transaktion);
    }
}