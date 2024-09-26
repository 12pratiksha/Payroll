import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrDeductSalaryHeadComponent } from './add-or-deduct-salary-head.component';

describe('AddOrDeductSalaryHeadComponent', () => {
  let component: AddOrDeductSalaryHeadComponent;
  let fixture: ComponentFixture<AddOrDeductSalaryHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrDeductSalaryHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrDeductSalaryHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
