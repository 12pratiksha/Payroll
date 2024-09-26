import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryDueRemarksComponent } from './salary-due-remarks.component';

describe('SalaryDueRemarksComponent', () => {
  let component: SalaryDueRemarksComponent;
  let fixture: ComponentFixture<SalaryDueRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryDueRemarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryDueRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
