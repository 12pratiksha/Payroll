import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECoffApprovalComponent } from './e-coff-approval.component';

describe('ECoffApprovalComponent', () => {
  let component: ECoffApprovalComponent;
  let fixture: ComponentFixture<ECoffApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECoffApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ECoffApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
