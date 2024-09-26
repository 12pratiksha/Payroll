import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSubDepartmentComponent } from './import-sub-department.component';

describe('ImportSubDepartmentComponent', () => {
  let component: ImportSubDepartmentComponent;
  let fixture: ComponentFixture<ImportSubDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportSubDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSubDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
