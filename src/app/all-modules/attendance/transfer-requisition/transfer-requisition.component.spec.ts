import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRequisitionComponent } from './transfer-requisition.component';

describe('TransferRequisitionComponent', () => {
  let component: TransferRequisitionComponent;
  let fixture: ComponentFixture<TransferRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferRequisitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
