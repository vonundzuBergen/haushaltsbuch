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
                if (t.KategorieId == kategorien[i].KategorieId && t.IsEinnahme == false) {
                    frequency += t.Betrag;
                }
            });

            if (frequency == 0) {
                continue;
            }

            kategorienFreq.push({ name: kategorien[i].Name, y: frequency });


            /*
            if (((frequency / transaktion.length) * 100) < 5) {

                if (kategorienFreq.length < 1) {
                    kategorienFreq.push({ name: "Sonstige", y: frequency });
                }
                else if (kategorienFreq.find(x => x.name == "Sonstige")) {

                    console.log("Sonstige");
                    let entry = kategorienFreq.find(x => x.name == "Sonstige");
                    let index = kategorienFreq.indexOf(entry);
                    kategorienFreq[index].y += frequency;

                }
                else {
                    kategorienFreq.push({ name: "Sonstige", y: frequency });
                }
            }
            else {
                kategorienFreq.push({ name: kategorien[i].Name, y: frequency });
            }
            */
        }

        console.log(kategorienFreq);

        return kategorienFreq;
    }
}