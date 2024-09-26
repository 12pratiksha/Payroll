import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAssignImportComponent } from './shift-assign-import.component';

describe('ShiftAssignImportComponent', () => {
  let component: ShiftAssignImportComponent;
  let fixture: ComponentFixture<ShiftAssignImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftAssignImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftAssignImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
