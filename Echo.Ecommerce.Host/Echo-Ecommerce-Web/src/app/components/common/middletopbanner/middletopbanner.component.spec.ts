import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddletopbannerComponent } from './middletopbanner.component';

describe('MiddletopbannerComponent', () => {
  let component: MiddletopbannerComponent;
  let fixture: ComponentFixture<MiddletopbannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddletopbannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddletopbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
