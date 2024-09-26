import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDropdownListComponent } from './import-dropdown-list.component';

describe('ImportDropdownListComponent', () => {
  let component: ImportDropdownListComponent;
  let fixture: ComponentFixture<ImportDropdownListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportDropdownListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDropdownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
