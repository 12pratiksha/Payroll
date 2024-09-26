import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferAquisitionComponent } from './transfer-aquisition.component';

describe('TransferAquisitionComponent', () => {
  let component: TransferAquisitionComponent;
  let fixture: ComponentFixture<TransferAquisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferAquisitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferAquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
