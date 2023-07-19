import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  selected!: Date;

  constructor(private adapter: DateAdapter<any>) {
    this.adapter.setLocale('en-GB'); // 'en-GB' locale makes Monday the first day of the week
  }
}
