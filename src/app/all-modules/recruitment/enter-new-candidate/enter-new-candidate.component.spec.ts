import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterNewCandidateComponent } from './enter-new-candidate.component';

describe('EnterNewCandidateComponent', () => {
  let component: EnterNewCandidateComponent;
  let fixture: ComponentFixture<EnterNewCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterNewCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterNewCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
