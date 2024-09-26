import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPayElementComponent } from './import-pay-element.component';

describe('ImportPayElementComponent', () => {
  let component: ImportPayElementComponent;
  let fixture: ComponentFixture<ImportPayElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportPayElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPayElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
