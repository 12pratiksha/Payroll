import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffApplicationComponent } from './coff-application.component';

describe('CoffApplicationComponent', () => {
  let component: CoffApplicationComponent;
  let fixture: ComponentFixture<CoffApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
