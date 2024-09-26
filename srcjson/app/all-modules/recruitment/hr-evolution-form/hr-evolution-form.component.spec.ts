import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEvolutionFormComponent } from './hr-evolution-form.component';

describe('HrEvolutionFormComponent', () => {
  let component: HrEvolutionFormComponent;
  let fixture: ComponentFixture<HrEvolutionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrEvolutionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEvolutionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
