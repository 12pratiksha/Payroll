import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtAdjustmentAssignComponent } from './ot-adjustment-assign.component';

describe('OtAdjustmentAssignComponent', () => {
  let component: OtAdjustmentAssignComponent;
  let fixture: ComponentFixture<OtAdjustmentAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtAdjustmentAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtAdjustmentAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
