import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarySlipFormatComponent } from './salary-slip-format.component';

describe('SalarySlipFormatComponent', () => {
  let component: SalarySlipFormatComponent;
  let fixture: ComponentFixture<SalarySlipFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalarySlipFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarySlipFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
