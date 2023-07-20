// TodoCloudsComponent.ts
import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { TodoWindowService } from '../services/todo-window.service';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss'],
})
export class ListTodoComponent implements OnInit {
  minusIcon = faMinus;
  todoArrayLeft: Array<any> = [];
  todoArrayRight: Array<any> = [];
  // testArray: Array<any> = [];

  constructor(private todoWindow: TodoWindowService) { }

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('gridContainer') private gridContainer!: ElementRef;


  ngOnInit() {

    // const firstTodo = {
    //   id: 1,
    //   todo:
    //     `• Lorem ipsum dolor sit amet.\n
    //      • consectetur adipiscing elit,
    //        sed do eiusmod tempor incididunt
    //        ut labore et dolore magna.\n
    //      • Ut enim ad minim veniam, quis nostrud
    //        exercitation ullamco laboris nisi\n
    //      • aliquip ex ea commodo consequat.`,

    //   date: '2023-07-18'
    // };

    // this.testArray = Array(21).fill(firstTodo);

    this.todoWindow.todos$.subscribe(todos => {
      this.todoArrayLeft = todos.filter((todo: any, index: number) => index % 2 === 0);
      this.todoArrayRight = todos.filter((todo: any, index: number) => index % 2 !== 0);

      // delaying to load only when previous elements are loaded in DOM
      setTimeout(() => {
        this.scrollToBottom();
        this.shiftGridToBottom();
      }, 0);
    });
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      this.gridContainer.nativeElement.scrollTop = this.gridContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  removeCloud(todo: any): void {
    this.todoWindow.removeTodo(todo);
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