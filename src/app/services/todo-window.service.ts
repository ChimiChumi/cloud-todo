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

  /**
   * This function retrieves the stored data from localstorage.
   * Other components can access the data with the help of this.
   */
  fetchTodos() {
    const todosString = localStorage.getItem('todos');
    if (todosString) {
      const todos = JSON.parse(todosString);
      this._todos.next(todos);
    }
  }

  /**
   * After adding a new todo the window should disappear and register as closed
   * @param visible - window visibility
   */
  toggleAddTodoVisibility(visible?: boolean) {
    if (visible !== undefined) {
      this._showAddTodo.next(visible);
    } else {
      this._showAddTodo.next(!this._showAddTodo.value);
    }
  }
}
