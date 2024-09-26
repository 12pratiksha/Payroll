import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESICStatementReportComponent } from './e-sicstatement-report.component';

describe('ESICStatementReportComponent', () => {
  let component: ESICStatementReportComponent;
  let fixture: ComponentFixture<ESICStatementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ESICStatementReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ESICStatementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
