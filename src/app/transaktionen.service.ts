import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Transaktion } from './transaktion';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TransaktionenService {

    private baseUrl = "http://localhost:34408/api/Transaktionen";

    constructor(private http: Http) {
    }

    put(transaktion: Transaktion): Observable<Transaktion[]> {

        let bodyString = JSON.stringify(transaktion);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let url = `${this.baseUrl}(${transaktion.TransaktionId})`;

        return this.http
            .put(url, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    post(transaktion: Transaktion): Observable<Transaktion> {
        let bodyString = JSON.stringify(transaktion); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        let url = `${this.baseUrl}`;

        return this.http
            .post(url, bodyString, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors
    }

    delete(id: number): Observable<Transaktion[]> {
        let url = `${this.baseUrl}(${id})`;

        return this.http
            .delete(url)
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    get(id: number): Observable<Transaktion[]> {
        let url = `${this.baseUrl}/${id}`;

        return this.http
            .get(url)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    getAll(): Observable<Transaktion[]> {
        let url = `${this.baseUrl}`;

        return this.http
            .get(url)
            .map(this.extractDate)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    private extractDate(res: Response) {
        var data = res.json().value || [];
        data.forEach((d: any) => {
            d.Datum = new Date(d.Datum);
        });
        return data;
    }
}