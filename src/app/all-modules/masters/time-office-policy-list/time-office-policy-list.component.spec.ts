import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOfficePolicyListComponent } from './time-office-policy-list.component';

describe('TimeOfficePolicyListComponent', () => {
  let component: TimeOfficePolicyListComponent;
  let fixture: ComponentFixture<TimeOfficePolicyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeOfficePolicyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOfficePolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
