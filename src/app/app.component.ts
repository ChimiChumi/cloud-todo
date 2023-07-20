import { Component, OnInit, OnDestroy } from '@angular/core';
import { faBars, faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { TodoWindowService } from './services/todo-window.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  barsIcon = faBars;
  plusIcon = faPlus;
  signOutIcon = faSignOut;
  showIcons = false;
  showOverlay = false;
  private overlaySub!: Subscription;


  constructor(private todoWindow: TodoWindowService) { }

  ngOnInit() {
    // Fetch todos when the app starts
    const initialTodos = this.todoWindow.fetchTodos();
    this.todoWindow._todos.next(initialTodos);

    this.overlaySub = this.todoWindow.showOverlay.subscribe((show: boolean) => {
      this.showOverlay = show;
    });
  }

  ngOnDestroy() {
    if (this.overlaySub) {
      this.overlaySub.unsubscribe();
    }
}

  toggleIcons() {
    this.showIcons = !this.showIcons;
  }

  toggleAddTodo() {
    this.todoWindow.toggleAddTodoVisibility(true);
    this.todoWindow.toggleOverlayVisibility(true);  // Add this line
    this.showIcons = false;
  }
}