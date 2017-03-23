import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Kategorie } from './kategorie';
import { Transaktion } from './transaktion';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PieChartService {
    getPieChartLabelsAndData(kategorien: Array<Kategorie>, transaktion: Array<Transaktion>): Array<any> {

        let kategorienFreq = new Array<any>();

        for (var i = 0; i < kategorien.length; i++) {

            let frequency = 0;

            transaktion.forEach(t => {
                if (t.KategorieId == kategorien[i].KategorieId) {
                    frequency++;
                }
            });

            if(frequency == 0){
                continue;
            }

            if (((frequency / transaktion.length) * 100) < 5) {

                if(kategorienFreq.length < 1){
                    kategorienFreq.push({ KategorieName: "Sonstige", AnzahlTransaktionen: frequency });
                }
                else if (kategorienFreq.find(x => x.KategorieName == "Sonstige")) {

                    console.log("Sonstige");
                    let entry = kategorienFreq.find(x => x.KategorieName == "Sonstige");
                    let index = kategorienFreq.indexOf(entry);
                    kategorienFreq[index].AnzahlTransaktionen += frequency;

                }
                else {
                    kategorienFreq.push({ KategorieName: "Sonstige", AnzahlTransaktionen: frequency });                    
                }
            }
            else {
                kategorienFreq.push({ KategorieName: kategorien[i].Name, AnzahlTransaktionen: frequency });
            }
        }

        console.log(kategorienFreq);

        return kategorienFreq;
    }
}