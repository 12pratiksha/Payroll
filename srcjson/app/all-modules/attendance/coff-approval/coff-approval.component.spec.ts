import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffApprovalComponent } from './coff-approval.component';

describe('CoffApprovalComponent', () => {
  let component: CoffApprovalComponent;
  let fixture: ComponentFixture<CoffApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
