import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListForApproverComponent } from './list-for-approver.component';

describe('ListForApproverComponent', () => {
  let component: ListForApproverComponent;
  let fixture: ComponentFixture<ListForApproverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListForApproverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListForApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
