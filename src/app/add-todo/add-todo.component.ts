import { Component, OnInit, OnDestroy } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { TodoWindowService } from '../services/todo-window.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit, OnDestroy {
  closeIcon = faX;
  todo: string;
  date: string;
  id: number;
  isClosed: boolean;

  private subscription: Subscription = new Subscription();

  constructor(private todoWindow: TodoWindowService) {
    this.todo = "";
    this.date = "";
    this.id = 0;
    this.isClosed = false;
  }

  ngOnInit(): void {
    this.subscription = this.todoWindow.showAddTodo.subscribe((show: boolean) => {
      this.isClosed = !show;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Add new data in localstorage
  submitForm(todoForm: NgForm): void {
    const todos = this.todoWindow.fetchTodos();

    const todoData = {
      id: todos.length + 1,  // start index from 1 instead of 0
      todo: this.todo,
      date: this.date
    };

    // call the service which handles it
    this.todoWindow.addTodo(todoData);

    // Reset and close window
    this.closeContainer();
  }

  // manually creating a bullet list inside textarea
  addBulletText(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.todo += '\n• ';
    }
  }

  mytextOnFocus() {
    if (!this.todo) {
      this.todo = '• ';
    }
  }

  closeContainer() {
    this.todoWindow.toggleAddTodoVisibility();
    this.todoWindow.toggleOverlayVisibility(false);
    this.todo = "";
    this.date = "";
  }
}