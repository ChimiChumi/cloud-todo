import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { TodoWindowService } from '../services/todo-window.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy, AfterViewInit {
  selected: Date = new Date();
  todoArray: any[] = [];

  private subscription: Subscription = new Subscription();


  constructor(
    private adapter: DateAdapter<any>,
    private todoWindow: TodoWindowService,
    private elementRef: ElementRef
  ) {
    this.adapter.setLocale('en-GB'); // 'en-GB' locale makes Monday the first day of the week
  }

  ngOnInit(): void {
    this.todoWindow.todos$.subscribe(todos => {
      this.todoArray = todos;
      this.highlightCalendarCells();
    });
    setTimeout(() => this.addNavigationListeners(), 0);
  }

  ngAfterViewInit(): void {
    this.highlightCalendarCells();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return this.isSameDate(date, today);
  }

  getFormattedDate(date: Date): string {
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  /**
   * Prints the task of the selected date in the card.
   * @param date selected date
   * @returns
   */
  dailyTasks(date: Date): string {
    const formattedDate = this.getFormattedDate(date);
    const tasks = this.todoArray
      .filter(todo => todo.date === formattedDate)
      .map(todo => todo.todo)
      .join('\n');
    return tasks;
  }

  /**
   * Changes the appearance of the cells where a task is assigned.
   */
  highlightCalendarCells(): void {
    const calendarCells = this.elementRef.nativeElement.querySelectorAll('.mat-calendar-body-cell');

    calendarCells.forEach((cell: HTMLElement) => {
      const ariaLabel = cell.getAttribute('aria-label');

      if (ariaLabel) {
        const date = new Date(ariaLabel);
        const formattedDate = this.getFormattedDate(date);
        const todoExists = this.todoArray.some(todo => todo.date === formattedDate);

        // Reset styles for all cells first
        cell.style.backgroundColor = '';
        cell.style.boxShadow = '';
        cell.style.borderRadius = '';

        if (todoExists) {
          cell.style.backgroundColor = 'transparent';
          cell.style.boxShadow = 'inset 0 0 0 0.2rem #c195cf';
          cell.style.borderRadius = '50%';
        }

        if (this.isToday(date)) {
          cell.style.backgroundColor = 'transparent';
          cell.style.boxShadow = 'inset 0 0 0 0.2rem #e39f9f';
          cell.style.borderRadius = '50%';
        }
      }
    });
  }

  /**
   * Workaround to highlight the cells which are not on the current calendar page.
   */
  addNavigationListeners(): void {
    const prevButtons = this.elementRef.nativeElement.querySelectorAll('.mat-calendar-previous-button');
    const nextButtons = this.elementRef.nativeElement.querySelectorAll('.mat-calendar-next-button');

    prevButtons.forEach((button: { addEventListener: (arg0: string, arg1: () => void) => void; }) => {
      button.addEventListener('click', () => {
        setTimeout(() => this.highlightCalendarCells(), 0);
      });
    });

    nextButtons.forEach((button: { addEventListener: (arg0: string, arg1: () => void) => void; }) => {
      button.addEventListener('click', () => {
        setTimeout(() => this.highlightCalendarCells(), 0);
      });
    });
  }
}
