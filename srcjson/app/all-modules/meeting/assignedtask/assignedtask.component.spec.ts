import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedtaskComponent } from './assignedtask.component';

describe('AssignedtaskComponent', () => {
  let component: AssignedtaskComponent;
  let fixture: ComponentFixture<AssignedtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedtaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
