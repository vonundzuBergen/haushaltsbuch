import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Kategorie } from './kategorie';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InfoBoxService {

    private _showError: Subject<Boolean>;
    public showError$: Observable<Boolean>;

    constructor() {
        this._showError = new Subject();
        this.showError$ = this._showError.asObservable();
    }

    showInfoBox(show: Boolean) {
        this._showError.next(show);
    }
}