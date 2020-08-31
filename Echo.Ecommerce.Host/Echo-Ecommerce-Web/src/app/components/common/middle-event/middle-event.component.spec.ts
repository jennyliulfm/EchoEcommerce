import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleEventComponent } from './middle-event.component';

describe('MiddleEventComponent', () => {
  let component: MiddleEventComponent;
  let fixture: ComponentFixture<MiddleEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
