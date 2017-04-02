import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'checkEndDate' })
export class CheckEndDatePipe implements PipeTransform {

    constructor(private datePipe: DatePipe) { }

    transform(endDate: Date): string {

        let date = new Date('01/01/2000');

        if (endDate.getFullYear() == date.getFullYear()
            && endDate.getMonth() == date.getMonth()
            && endDate.getDate() == date.getDate()) {
            return "-";
        }
        else {
            return this.datePipe.transform(endDate);
        }
    }
}