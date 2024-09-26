import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESICMasterReportComponent } from './e-sicmaster-report.component';

describe('ESICMasterReportComponent', () => {
  let component: ESICMasterReportComponent;
  let fixture: ComponentFixture<ESICMasterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ESICMasterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ESICMasterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
