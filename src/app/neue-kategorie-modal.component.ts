import { Component, OnInit, OnDestroy } from '@angular/core';
import { KategorienController } from './kategorien.controller';
import { Kategorie } from './kategorie';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';

@Component({
    selector: 'neue-kategorie-modal',
    templateUrl: '/app/neue-kategorie-modal.component.html',
    styleUrls: ['app/neue-kategorie-modal.component.css']
})
export class NeueKategorieModalComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    private kategorien: Array<Kategorie>;
    private subscription: Subscription;

    private nameIsTaken: Boolean;
    private namePatternOk: Boolean;

    constructor(private _kategorienController: KategorienController, private _fb: FormBuilder) {
        this.nameIsTaken = true;
        this.namePatternOk = false;

        this.kategorien = new Array<Kategorie>();

        this.subscription = this._kategorienController.kategorien$.subscribe(
            kategorien => {
                this.kategorien = kategorien;
                console.log("hallo");
                console.log(this.kategorien);
            }
        )
    }

    ngOnInit(): void {
        this.form = this._fb.group({
            name: ['']
        })

        let name = this.form.controls['name'];
        name.valueChanges
            .do(() => {

                this.namePatternOk = false;

                if (!this.form.controls['name'].value) {
                    console.log("doesnt exist");
                    this.form.controls['name'].markAsPristine();
                    return;
                }
                if (this.form.controls['name'].value.length == 0) {
                    console.log("marking as pristine");
                    this.form.controls['name'].markAsPristine();
                    return;
                }
            })
            .map((x: String) => x.trim().replace(/ +(?= )/g, ''))
            .do(x => {
                let nameWithoutSpaces = x.replace(/\s/g, '');

                if (nameWithoutSpaces.length < 3) {
                    return;
                }

                this.namePatternOk = true;
            })
            .debounceTime(200).subscribe((x: string) => {

                console.log(x);

                if (this.kategorien.findIndex(k => k.Name === x) != -1) {
                    this.nameIsTaken = true;
                    return;
                } else {
                    this.nameIsTaken = false;
                }
            });
    }

    addKategorie() {
        var name = this.form.controls['name'].value.trim().replace(/ +(?= )/g, '');

        if (this.kategorien.findIndex(x => x.Name === name) != -1) {
            return;
        }

        var kategorie = new Kategorie();
        kategorie.Name = name;

        this._kategorienController.addKategorie(kategorie);

        this.clearForm();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    clearForm() {
        this.form.controls['name'].setValue('');
        this.form.markAsPristine();
    }
}
