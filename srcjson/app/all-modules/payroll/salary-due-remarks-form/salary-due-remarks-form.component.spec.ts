import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryDueRemarksFormComponent } from './salary-due-remarks-form.component';

describe('SalaryDueRemarksFormComponent', () => {
  let component: SalaryDueRemarksFormComponent;
  let fixture: ComponentFixture<SalaryDueRemarksFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryDueRemarksFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryDueRemarksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
