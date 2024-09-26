import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PFRegisterReportComponent } from './p-fregister-report.component';

describe('PFRegisterReportComponent', () => {
  let component: PFRegisterReportComponent;
  let fixture: ComponentFixture<PFRegisterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PFRegisterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PFRegisterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
