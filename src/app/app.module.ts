import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { ListTodoComponent } from './todo-clouds/list-todo.component';
import { CalendarComponent } from './calendar/calendar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from './calendar/custom-date-adapter';


@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    ListTodoComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
],
  bootstrap: [AppComponent]
})
export class AppModule {}
