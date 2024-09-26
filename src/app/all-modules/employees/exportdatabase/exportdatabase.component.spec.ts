import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportdatabaseComponent } from './exportdatabase.component';

describe('ExportdatabaseComponent', () => {
  let component: ExportdatabaseComponent;
  let fixture: ComponentFixture<ExportdatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportdatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportdatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
