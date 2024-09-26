import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Monthlyattendence11Component } from './monthlyattendence11.component';

describe('Monthlyattendence11Component', () => {
  let component: Monthlyattendence11Component;
  let fixture: ComponentFixture<Monthlyattendence11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Monthlyattendence11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Monthlyattendence11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
