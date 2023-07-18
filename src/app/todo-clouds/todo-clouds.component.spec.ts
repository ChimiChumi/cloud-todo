import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCloudsComponent } from './todo-clouds.component';

describe('TodoCloudsComponent', () => {
  let component: TodoCloudsComponent;
  let fixture: ComponentFixture<TodoCloudsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoCloudsComponent]
    });
    fixture = TestBed.createComponent(TodoCloudsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
