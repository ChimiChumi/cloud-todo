import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoWindowService {

  private _showAddTodo = new BehaviorSubject<boolean>(false);
  _todos = new BehaviorSubject<any[]>([]);

  private _showOverlay = new BehaviorSubject<boolean>(false);
  showOverlay = this._showOverlay.asObservable();

  showAddTodo = this._showAddTodo.asObservable();
  todos$ = this._todos.asObservable();

  constructor() { }

  /**
   * This function retrieves the stored data from localstorage.
   * Other components can access the data with the help of this.
   */
  fetchTodos(): any[] {
    const todosString = localStorage.getItem('todos');
    return todosString ? JSON.parse(todosString) : [];
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

  // handles the background blur when adding new todo
  toggleOverlayVisibility(show: boolean) {
    this._showOverlay.next(show);
  }

  // adds todo into localstorage
  addTodo(todo: any): void {
    const todos = this.fetchTodos();
    todo.id = uuidv4(); // using uuid as id
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.updateTodos(todos);
  }

  // removes todo from localstorage
  removeTodo(todo: any): void {
    let todos = this.fetchTodos();
    todos = todos.filter((t: any) => t.id !== todo.id);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.updateTodos(todos);
  }

  // updates the status of all, instead of having to refresh the page
  private updateTodos(todos: any[]): void {
    this._todos.next(todos);
  }
}
