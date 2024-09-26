import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLeavesComponent } from './import-leaves.component';

describe('ImportLeavesComponent', () => {
  let component: ImportLeavesComponent;
  let fixture: ComponentFixture<ImportLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportLeavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
