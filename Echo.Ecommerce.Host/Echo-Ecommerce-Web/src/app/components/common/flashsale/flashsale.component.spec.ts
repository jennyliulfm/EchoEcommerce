import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashsaleComponent } from './flashsale.component';

describe('FlashsaleComponent', () => {
  let component: FlashsaleComponent;
  let fixture: ComponentFixture<FlashsaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashsaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
