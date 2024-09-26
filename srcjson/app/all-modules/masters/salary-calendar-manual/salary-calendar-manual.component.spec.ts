import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryCalendarManualComponent } from './salary-calendar-manual.component';

describe('SalaryCalendarManualComponent', () => {
  let component: SalaryCalendarManualComponent;
  let fixture: ComponentFixture<SalaryCalendarManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryCalendarManualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryCalendarManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
