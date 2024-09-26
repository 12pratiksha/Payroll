import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECoffApplicationListComponent } from './e-coff-application-list.component';

describe('ECoffApplicationListComponent', () => {
  let component: ECoffApplicationListComponent;
  let fixture: ComponentFixture<ECoffApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECoffApplicationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ECoffApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
