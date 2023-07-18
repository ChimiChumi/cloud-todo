// TodoCloudsComponent.ts
import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition, useAnimation } from '@angular/animations';
import { TodoWindowService } from '../services/todo-window.service';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-clouds',
  templateUrl: './todo-clouds.component.html',
  styleUrls: ['./todo-clouds.component.css'],
  // TODO: have fun with animations
  // animations: [
  //   trigger('removeCloud', [
  //     transition(':leave', [
  //       animate('0.1s', style({ opacity: 0, transform: 'scale(0)' }))
  //     ])
  //   ])
  // ]
})
export class TodoCloudsComponent implements OnInit {
  minusIcon = faMinus;
  todoArrayOdd: Array<any> = [];
  todoArrayEven: Array<any> = [];
  testArray: Array<any> = [];

  constructor(
    private elementRef: ElementRef,
    private todoWindow: TodoWindowService
  ) {

  }

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('gridContainer') private gridContainer!: ElementRef;


  ngOnInit() {

    const firstTodo = {
      id: 1,
      todo:
        `Lorem ipsum dolor sit amet,
         consectetur adipiscing elit,
         sed do eiusmod tempor incididunt
         ut labore et dolore magna aliqua.
         Ut enim ad minim veniam, quis nostrud
         exercitation ullamco laboris nisi ut
         aliquip ex ea commodo consequat.`,

      date: '2023-07-18'
    };

    this.testArray = Array(21).fill(firstTodo);

    this.todoWindow.todos$.subscribe(todos => {
      this.todoArrayOdd = todos.filter((todo: any) => todo.id % 2 !== 0);
      this.todoArrayEven = todos.filter((todo: any) => todo.id % 2 === 0);

      // delaying to load only when previous elements are loaded in DOM
      setTimeout(() => {
        this.scrollToBottom();
        this.shiftGridToBottom();
      }, 0);
    });
  }

  scrollToBottom(): void {
    console.log("SCROLLED!");
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      this.gridContainer.nativeElement.scrollTop = this.gridContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  removeCloud(todo: any) {
    // Get the current todos from local storage
    let currentTodos = JSON.parse(localStorage.getItem('todos') || '[]');

    // Filter out the todo that matches the todo we want to remove
    currentTodos = currentTodos.filter((t: any) => t.id !== todo.id);

    // Save the updated todos back to local storage
    localStorage.setItem('todos', JSON.stringify(currentTodos));

    // Update the todoArray, todoArrayOdd, todoArrayEven arrays
    this.todoArrayOdd = currentTodos.filter((t: any) => t.id % 2 !== 0);
    this.todoArrayEven = currentTodos.filter((t: any) => t.id % 2 === 0);
  }

  /**
   * The function serves as workaround to shift the entire .grid-container
   * to the bottom of the scrollable area, keeping it centered.
   */
  @HostListener('window:resize')
  onWindowResize() {
    this.shiftGridToBottom();
  }

  shiftGridToBottom() {
    console.log("SHIFTED!");
    const scrollHeight = this.scrollContainer.nativeElement.scrollHeight;
    const gridHeight = this.gridContainer.nativeElement.offsetHeight;
    const offset = Math.max(scrollHeight - gridHeight, 0);

    const containerWidth = this.gridContainer.nativeElement.offsetWidth;
    const scrollContainerWidth = this.scrollContainer.nativeElement.offsetWidth;
    const horizontalOffset = (scrollContainerWidth - containerWidth) / 2;

    this.gridContainer.nativeElement.style.transform = `translate(${horizontalOffset}px, ${offset}px)`;
  }
}