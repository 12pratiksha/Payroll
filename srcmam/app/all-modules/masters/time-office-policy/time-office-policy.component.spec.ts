import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOfficePolicyComponent } from './time-office-policy.component';

describe('TimeOfficePolicyComponent', () => {
  let component: TimeOfficePolicyComponent;
  let fixture: ComponentFixture<TimeOfficePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeOfficePolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOfficePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
