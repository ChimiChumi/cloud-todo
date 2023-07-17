import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoWindowService {

  private _showAddTodo = new BehaviorSubject<boolean>(false);
  private _todos = new BehaviorSubject<any[]>([]);

  showAddTodo = this._showAddTodo.asObservable();
  todos$ = this._todos.asObservable();

  constructor() { }

  fetchTodos() {
    const todosString = localStorage.getItem('todos');
    if (todosString) {
      const todos = JSON.parse(todosString);
      this._todos.next(todos);
    }
  }

  toggleAddTodoVisibility(visible?: boolean) {
    if (visible !== undefined) {
      this._showAddTodo.next(visible);
    } else {
      this._showAddTodo.next(!this._showAddTodo.value);
    }
  }
}
