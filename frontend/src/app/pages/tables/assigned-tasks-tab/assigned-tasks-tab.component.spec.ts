import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTasksTabComponent } from './assigned-tasks-tab.component';

describe('AssignedTasksTabComponent', () => {
  let component: AssignedTasksTabComponent;
  let fixture: ComponentFixture<AssignedTasksTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedTasksTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedTasksTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
