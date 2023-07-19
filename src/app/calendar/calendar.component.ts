import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { TodoWindowService } from '../services/todo-window.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  selected: Date = new Date();

  constructor(
    private adapter: DateAdapter<any>,
    private todoWindow: TodoWindowService
  ) {
    this.adapter.setLocale('en-GB'); // 'en-GB' locale makes Monday the first day of the week
  }

  ngOnInit(): void {
    this.todoWindow.todos$.subscribe(todos => {
      todos.forEach(element => {
      });
    });
  }

  isToday(): boolean {
    const today = new Date();

    return this.selected?.getDate() === today.getDate() &&
      this.selected?.getMonth() === today.getMonth() &&
      this.selected?.getFullYear() === today.getFullYear();
  }

  /**
   * Transforms the standard date format into a more user-friendly result.
   * @returns formatted, readable date
   */
  getFormattedDate(): string {
    let year = this.selected.getFullYear();
    // JavaScript months are 0-based, so +1 to get the correct month number
    let month = ("0" + (this.selected.getMonth() + 1)).slice(-2);
    let day = ("0" + this.selected.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  /**
   * This function displays the todo task if it matches the date.
   * @returns a task happening on the selected date.
   */
  dailyTasks(): string {
    let task = "";

    this.todoWindow.todos$.subscribe(todos => {
      todos.forEach(element => {
        if (this.getFormattedDate() === element.date) {
          if (task === "") {
            task = element.todo;
          }
          else {
            task += "\n" + element.todo;
          }
        }
      });
    });
    return task;
  }
}
