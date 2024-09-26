import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAndReviseSalaryComponent } from './view-and-revise-salary.component';

describe('ViewAndReviseSalaryComponent', () => {
  let component: ViewAndReviseSalaryComponent;
  let fixture: ComponentFixture<ViewAndReviseSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAndReviseSalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAndReviseSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
