// TodoCloudsComponent.ts
import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, HostListener } from '@angular/core';
import { TodoWindowService } from '../services/todo-window.service';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-clouds',
  templateUrl: './todo-clouds.component.html',
  styleUrls: ['./todo-clouds.component.css']
})
export class TodoCloudsComponent implements OnInit {
  minusIcon = faMinus;
  todoArray: Array<any> = [];
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
      todo: `• TES TESTESTE STESTESTasdas \n    • ESTESTESTESTEST ESTESTESTTESTESTE STESTESTESTESTESTTESTESTESTESTESTESTESTESTTESTESTESTESTESTESTESTESTTESTESTESTESTESTESTESTEST`,
      date: '2023-07-18'
    };

    this.testArray = Array(21).fill(firstTodo);


    this.todoWindow.todos$.subscribe(todos => {
      this.todoArray = todos;
      this.todoArrayOdd = todos.filter((todo: any) => todo.id % 2 !== 0);
      this.todoArrayEven = todos.filter((todo: any) => todo.id % 2 === 0);
    });

    setTimeout(() => {
      this.scrollToBottom();
      this.shiftGridToBottom();
    }, 0);
  }

  scrollToBottom(): void {

    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      this.gridContainer.nativeElement.scrollTop = this.gridContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  removeCloud() {
    console.log("Removed!");

    //TODO: remove button
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
    const scrollHeight = this.scrollContainer.nativeElement.scrollHeight;
    const gridHeight = this.gridContainer.nativeElement.offsetHeight;
    const offset = Math.max(scrollHeight - gridHeight, 0);

    const containerWidth = this.gridContainer.nativeElement.offsetWidth;
    const scrollContainerWidth = this.scrollContainer.nativeElement.offsetWidth;
    const horizontalOffset = (scrollContainerWidth - containerWidth) / 2;

    this.gridContainer.nativeElement.style.transform = `translate(${horizontalOffset}px, ${offset}px)`;
  }
}