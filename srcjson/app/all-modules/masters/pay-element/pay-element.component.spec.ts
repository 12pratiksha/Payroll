import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayElementComponent } from './pay-element.component';

describe('PayElementComponent', () => {
  let component: PayElementComponent;
  let fixture: ComponentFixture<PayElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
