import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAppointmentComponent } from './candidate-appointment.component';

describe('CandidateAppointmentComponent', () => {
  let component: CandidateAppointmentComponent;
  let fixture: ComponentFixture<CandidateAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
