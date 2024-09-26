import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRequisitionFormComponent } from './transfer-requisition-form.component';

describe('TransferRequisitionFormComponent', () => {
  let component: TransferRequisitionFormComponent;
  let fixture: ComponentFixture<TransferRequisitionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferRequisitionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferRequisitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
