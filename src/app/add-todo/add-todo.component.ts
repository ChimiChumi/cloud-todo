import { Component } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  closeIcon = faX;
  todo: string;
  date: string;
  id: number;
  isClosed: boolean;

  constructor() {
    this.todo = "";
    this.date = "";
    this.id = 0;
    this.isClosed = false;
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
  }

  generateUniqueId(): number {
    this.id++; // Increment the id counter
    return this.id;
  }

  closeContainer() {
    this.isClosed = true;
  }
}