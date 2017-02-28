import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Kategorie } from './kategorie';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class KategorienService {

    private baseUrl = "/app/kategorien.json";

    constructor(private http: Http) {
    }

    put(kategorie: Kategorie): Observable<Kategorie[]> {

        let bodyString = JSON.stringify(kategorie);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let url = `${this.baseUrl}/${kategorie.id}`;

        return this.http
            .put(url, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    post(kategorie: Kategorie): Observable<Kategorie[]> {
        let bodyString = JSON.stringify(kategorie); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        let url = `${this.baseUrl}/${kategorie.id}`;

        return this.http
            .post(url, bodyString, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors
    }

    delete(id: number): Observable<Kategorie[]> {
        let url = `${this.baseUrl}/${id}`;

        return this.http
            .delete(url)
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    get(id: number): Observable<Kategorie[]> {
        let url = `${this.baseUrl}/${id}`;

        return this.http
            .get(url)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    getAll(): Observable<Kategorie[]> {
        let url = `${this.baseUrl}`;

        return this.http
            .get(url)
            .map(response => response.json().kategorien)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}