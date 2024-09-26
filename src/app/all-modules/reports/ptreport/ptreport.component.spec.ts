import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtreportComponent } from './ptreport.component';

describe('PtreportComponent', () => {
  let component: PtreportComponent;
  let fixture: ComponentFixture<PtreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
