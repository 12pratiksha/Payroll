import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECoffApplicationComponent } from './e-coff-application.component';

describe('ECoffApplicationComponent', () => {
  let component: ECoffApplicationComponent;
  let fixture: ComponentFixture<ECoffApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECoffApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ECoffApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
