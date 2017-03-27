import { Component, OnInit, OnDestroy } from '@angular/core';
import { KategorienController } from './kategorien.controller';
import { Kategorie } from './kategorie';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'neue-kategorie-modal',
    templateUrl: '/app/neue-kategorie-modal.component.html'
})
export class NeueKategorieModalComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    private kategorien: Array<Kategorie>;
    private subscription: Subscription;
    private nameIsTaken: Boolean;

    constructor(private _kategorienController: KategorienController, private _fb: FormBuilder) {
        this.nameIsTaken = false;
        this.kategorien = new Array<Kategorie>();

        this.subscription = this._kategorienController.kategorien$.subscribe(
            kategorien => {
                for (var k of kategorien) {
                    this.kategorien.push(k);
                }
            }
        )
    }

    ngOnInit(): void {
        this.form = this._fb.group({
            name: ['']
        })

        let name = this.form.controls['name'];
        name.valueChanges.debounceTime(400).subscribe((value: string) => {
            console.log(value);

            if (this.kategorien.findIndex(x => x.Name === value) != -1) {
                this.nameIsTaken = true;
                console.log("exists");
                return;
            } else {
                this.nameIsTaken = false;
            }
        });
    }

    addKategorie() {
        var name = this.form.controls['name'].value;



        var kategorie = new Kategorie();
        kategorie.Name = name;

        this._kategorienController.addKategorie(kategorie);

        this.clearForm();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    clearForm() {
        this.form.controls['name'].reset();
    }
}
