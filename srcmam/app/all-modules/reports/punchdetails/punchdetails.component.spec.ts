import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchdetailsComponent } from './punchdetails.component';

describe('PunchdetailsComponent', () => {
  let component: PunchdetailsComponent;
  let fixture: ComponentFixture<PunchdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunchdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
