import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlebannerComponent } from './middlebanner.component';

describe('MiddlebannerComponent', () => {
  let component: MiddlebannerComponent;
  let fixture: ComponentFixture<MiddlebannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddlebannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddlebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
