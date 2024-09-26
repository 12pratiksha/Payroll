import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtAdjustmentSetupComponent } from './ot-adjustment-setup.component';

describe('OtAdjustmentSetupComponent', () => {
  let component: OtAdjustmentSetupComponent;
  let fixture: ComponentFixture<OtAdjustmentSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtAdjustmentSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtAdjustmentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
