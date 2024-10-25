import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvedTasksTabComponent } from './solved-tasks-tab.component';

describe('SolvedTasksTabComponent', () => {
  let component: SolvedTasksTabComponent;
  let fixture: ComponentFixture<SolvedTasksTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolvedTasksTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolvedTasksTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
