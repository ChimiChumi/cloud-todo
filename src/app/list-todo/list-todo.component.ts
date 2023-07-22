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
  // testArray: Array<any> = []; <-- remove to test with dumy

  constructor(private todoWindow: TodoWindowService) { }

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('gridContainer') private gridContainer!: ElementRef;


  ngOnInit() {

    /* REMOVE COMMENTS FOR DUMMY DATA
    // Hard coded dummy data
     const firstTodo = {
       id: '',
       todo:
         `"Lorem ipsum dolor sit amet, consectetur
           adipiscing elit, sed do eiusmod tempor
           incididunt ut labore et dolore magna aliqua.
           Ut enim ad minim veniam, quis nostrud exercitation
           ullamco laboris nisi ut aliquip ex ea commodo consequat.
           Duis aute irure dolor in reprehenderit in voluptate velit
           esse cillum dolore eu fugiat nulla pariatur. Excepteur
           sint occaecat cupidatat non proident, sunt in culpa
           qui officia deserunt mollit anim id est laborum."`,
       date: ''
     }
     this.testArray = Array(20).fill(firstTodo); */

    this.todoWindow.todos$.subscribe(todos => {
      this.todoArrayLeft = todos.filter((todo: any, index: number) => index % 2 === 0);
      this.todoArrayRight = todos.filter((todo: any, index: number) => index % 2 !== 0);

      // delaying to load only when previous elements are loaded in DOM
      setTimeout(() => {
        //this.scrollToBottom();
        this.shiftGridToBottom();
      }, 0);
    });
  }

  // Automatically scroll to the bottom of the scrollable area upon landing on the page.
  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      this.gridContainer.nativeElement.scrollTop = this.gridContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  removeCloud(todo: any): void {
    this.todoWindow.removeTodo(todo);
  }


  // Workaround to fix bug when page is resized.
  @HostListener('window:resize')
  onWindowResize() {
    this.shiftGridToBottom();
  }

  /**
   * The function serves as workaround to shift the entire .grid-container
   * to the bottom of the scrollable area, keeping it centered.
   */
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