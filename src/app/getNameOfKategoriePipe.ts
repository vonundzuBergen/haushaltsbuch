import { Pipe, PipeTransform } from '@angular/core';
import { Kategorie } from './kategorie';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({ name: 'getName' })
export class GetNameOfKategoriePipe implements PipeTransform {

  transform(id: number, kategorien: Kategorie[]): string {
    if (kategorien.length < 1) {
      return;
    }

    let kategorie: Kategorie = kategorien.find(x => x.KategorieId == id);
    return kategorie.Name;
  }
}