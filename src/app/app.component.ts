import { Component, OnInit } from '@angular/core';
import { faBars, faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { TodoWindowService } from './services/todo-window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  barsIcon = faBars;
  plusIcon = faPlus;
  signOutIcon = faSignOut;
  showIcons = false;

  constructor(private todoWindow: TodoWindowService) { }

  ngOnInit(): void {
    this.todoWindow.fetchTodos();
  }

  toggleIcons() {
    this.showIcons = !this.showIcons;
  }

  toggleAddTodo() {
    this.todoWindow.toggleAddTodoVisibility(true);
    this.showIcons = false;
  }
}