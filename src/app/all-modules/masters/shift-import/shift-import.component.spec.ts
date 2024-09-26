import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftImportComponent } from './shift-import.component';

describe('ShiftImportComponent', () => {
  let component: ShiftImportComponent;
  let fixture: ComponentFixture<ShiftImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
