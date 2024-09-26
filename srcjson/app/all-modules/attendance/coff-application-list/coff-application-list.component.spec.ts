import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffApplicationListComponent } from './coff-application-list.component';

describe('CoffApplicationListComponent', () => {
  let component: CoffApplicationListComponent;
  let fixture: ComponentFixture<CoffApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffApplicationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
