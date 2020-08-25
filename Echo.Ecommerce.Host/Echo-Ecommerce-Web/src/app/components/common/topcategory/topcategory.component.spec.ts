import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopcategoryComponent } from './topcategory.component';

describe('TopcategoryComponent', () => {
  let component: TopcategoryComponent;
  let fixture: ComponentFixture<TopcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
