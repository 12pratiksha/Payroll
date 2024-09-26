import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementApprovedComponent } from './requirement-approved.component';

describe('RequirementApprovedComponent', () => {
  let component: RequirementApprovedComponent;
  let fixture: ComponentFixture<RequirementApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequirementApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
