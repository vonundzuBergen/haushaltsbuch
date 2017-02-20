import { Component } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

@Component({
    selector: 'neue-transaktion-modal',
    templateUrl: '/app/neue-transaktion-modal.component.html'
})
export class NeueTransaktionModalComponent {
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    constructor() { }

    // dateChanged callback function called when the user select the date. This is mandatory callback
    // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
    onDateChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }
}
