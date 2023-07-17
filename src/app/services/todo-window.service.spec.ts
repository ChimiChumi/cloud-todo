import { TestBed } from '@angular/core/testing';

import { TodoWindowService } from './todo-window.service';

describe('TodoWindowService', () => {
  let service: TodoWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
