import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESICRegisterReportComponent } from './e-sicregister-report.component';

describe('ESICRegisterReportComponent', () => {
  let component: ESICRegisterReportComponent;
  let fixture: ComponentFixture<ESICRegisterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ESICRegisterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ESICRegisterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
