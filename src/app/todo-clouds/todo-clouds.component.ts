// TodoCloudsComponent.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { TodoWindowService } from '../services/todo-window.service';

@Component({
  selector: 'app-todo-clouds',
  templateUrl: './todo-clouds.component.html',
  styleUrls: ['./todo-clouds.component.css']
})
export class TodoCloudsComponent implements OnInit, AfterViewChecked {
  squareCount: number = 0;
  todoArray: Array<any> = [];

  todoArrayOdd: Array<any> = [];
  todoArrayEven: Array<any> = [];

  constructor(
    private elementRef: ElementRef,
    private todoWindow: TodoWindowService
  ) { }

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  ngOnInit() {
    this.scrollToBottom();

    const containerHeight = window.innerHeight + 'px';
    const backgroundContainer = this.elementRef.nativeElement.querySelector('.background-container') as HTMLElement;

    if (backgroundContainer) {
      backgroundContainer.style.height = containerHeight;
    }

    this.todoWindow.todos$.subscribe(todos => {
      this.todoArray = todos;
      this.todoArrayOdd = todos.filter((todo: any) => todo.id % 2 !== 0);
      this.todoArrayEven = todos.filter((todo: any) => todo.id % 2 === 0);
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}