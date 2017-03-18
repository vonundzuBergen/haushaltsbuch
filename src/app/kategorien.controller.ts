import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Kategorie } from './kategorie';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { KategorienService } from './kategorien.service';

@Injectable()
export class KategorienController {

    private _kategorienSource: BehaviorSubject<Kategorie[]>;
    public kategorien$: Observable<Kategorie[]>;

    constructor(private _kategorienService: KategorienService) {
        this._kategorienSource = new BehaviorSubject(new Array<Kategorie>());
        this.kategorien$ = this._kategorienSource.asObservable();
        this.getAllKategorien();
    }

    addKategorie(kategorie: Kategorie) {
        let obs = this._kategorienService.post(kategorie);

        obs.subscribe(res => {
            console.log(res);
            let t: Kategorie[] = this._kategorienSource.getValue();

            kategorie.KategorieId = res.KategorieId;
            t.push(kategorie);
            this._kategorienSource.next(t);

            console.log(t);
        });
    }

    updateKategorie(kategorie: Kategorie) {
        let obs = this._kategorienService.put(kategorie);

        obs.subscribe(res => {
            let t = this._kategorienSource.getValue();
            let index = t.map(x => x.KategorieId).indexOf(kategorie.KategorieId, 0);
            t.splice(index, 1);
            t.push(kategorie);
            this._kategorienSource.next(t);
        });
    }

    deleteKategorie(id: number) {
        let obs = this._kategorienService.delete(id);

        obs.subscribe(res => {
            let t: Kategorie[] = this._kategorienSource.getValue();

            let index = t.map(x => x.KategorieId).indexOf(id, 0);
            t.splice(index, 1);

            this._kategorienSource.next(t);
        });
    }

    getAllKategorien() {
        let obs = this._kategorienService.getAll();

        obs.subscribe(res => {

            //let t = this._kategorienSource.getValue();
            let t = new Array<Kategorie>();

            res.map(x => {
                t.push(x);
            });
            this._kategorienSource.next(t);
            t.forEach(element => {
                console.log("Kategorien:");
                console.log(element);
            });
        })
    }
}