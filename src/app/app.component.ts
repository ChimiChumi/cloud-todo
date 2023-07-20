import { Component, OnInit } from '@angular/core';
import { faBars, faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { TodoWindowService } from './services/todo-window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  barsIcon = faBars;
  plusIcon = faPlus;
  signOutIcon = faSignOut;
  showIcons = false;

  constructor(private todoWindow: TodoWindowService) { }

  ngOnInit() {
    // Fetch todos when the app starts
    const initialTodos = this.todoWindow.fetchTodos();
    this.todoWindow._todos.next(initialTodos);
  }

  toggleIcons() {
    this.showIcons = !this.showIcons;
  }

  toggleAddTodo() {
    this.todoWindow.toggleAddTodoVisibility(true);
    this.showIcons = false;
  }
}