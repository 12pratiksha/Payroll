import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtAdjustmentHistoryComponent } from './ot-adjustment-history.component';

describe('OtAdjustmentHistoryComponent', () => {
  let component: OtAdjustmentHistoryComponent;
  let fixture: ComponentFixture<OtAdjustmentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtAdjustmentHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtAdjustmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
