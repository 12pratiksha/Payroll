import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationAcceptanceComponent } from './resignation-acceptance.component';

describe('ResignationAcceptanceComponent', () => {
  let component: ResignationAcceptanceComponent;
  let fixture: ComponentFixture<ResignationAcceptanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResignationAcceptanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignationAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
