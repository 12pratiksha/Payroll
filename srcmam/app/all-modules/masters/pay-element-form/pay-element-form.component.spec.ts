import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayElementFormComponent } from './pay-element-form.component';

describe('PayElementFormComponent', () => {
  let component: PayElementFormComponent;
  let fixture: ComponentFixture<PayElementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayElementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayElementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
