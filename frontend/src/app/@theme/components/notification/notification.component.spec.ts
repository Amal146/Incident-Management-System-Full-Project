import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverNotifyComponent } from './popover-notify.component';


describe('NotificationComponent', () => {
  let component: PopoverNotifyComponent;
  let fixture: ComponentFixture<PopoverNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopoverNotifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopoverNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
