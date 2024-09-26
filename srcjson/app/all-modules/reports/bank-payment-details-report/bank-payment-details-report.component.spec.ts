import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankPaymentDetailsReportComponent } from './bank-payment-details-report.component';

describe('BankPaymentDetailsReportComponent', () => {
  let component: BankPaymentDetailsReportComponent;
  let fixture: ComponentFixture<BankPaymentDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankPaymentDetailsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankPaymentDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
