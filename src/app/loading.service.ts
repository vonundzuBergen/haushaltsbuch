import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingService {
    
    private _showLoading: Subject<boolean>;
    public showLoading$: Observable<boolean>;

    constructor() {
        this._showLoading = new Subject();
        this.showLoading$ = this._showLoading.asObservable();
    }

    showLoading(x: boolean) {
        console.log(x);
        this._showLoading.next(x);
    }
}