import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPaneComponent } from './notifications-pane.component';

describe('NotificationsPaneComponent', () => {
  let component: NotificationsPaneComponent;
  let fixture: ComponentFixture<NotificationsPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsPaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
