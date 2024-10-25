import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyToTestTabComponent } from './ready-to-test-tab.component';

describe('ReadyToTestTabComponent', () => {
  let component: ReadyToTestTabComponent;
  let fixture: ComponentFixture<ReadyToTestTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyToTestTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyToTestTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
