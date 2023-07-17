import { Component, OnInit, OnDestroy } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { TodoWindowService } from '../services/todo-window.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit, OnDestroy {
  closeIcon = faX;
  todo: string;
  date: string;
  id: number;
  isClosed: boolean;
  todoArray: Array<any> = [];
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
    this.fetchTodos();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  submitForm(todoForm: NgForm) {
    const todoData = {
      id: this.generateUniqueId(),
      todo: this.todo,
      date: this.date
    };

    // Save the form data to local storage
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.push(todoData);
    localStorage.setItem('todos', JSON.stringify(todos));

    console.log(todoData);
    this.todo = "";
    this.date = "";

    this.todoWindow.fetchTodos();
    this.closeContainer();
  }

  fetchTodos() {
    const todosString = localStorage.getItem('todos');
    if (todosString) {
      this.todoArray = JSON.parse(todosString);
    }
  }

  generateUniqueId(): number {
    this.id++; // Increment the id counter
    return this.id;
  }

  addBulletText(event: any) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      this.todo += '• '
    }

    if (this.todo.substr(this.todo.length - 1) == '\n') {
      this.todo = this.todo.substring(0, this.todo.length - 1);
    }
  }

  mytextOnFocus() {
    this.todo += '• ';
  }

  closeContainer() {
    this.todoWindow.toggleAddTodoVisibility();
  }
}