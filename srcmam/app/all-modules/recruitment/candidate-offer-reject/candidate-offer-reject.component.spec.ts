import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateOfferRejectComponent } from './candidate-offer-reject.component';

describe('CandidateOfferRejectComponent', () => {
  let component: CandidateOfferRejectComponent;
  let fixture: ComponentFixture<CandidateOfferRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateOfferRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateOfferRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
