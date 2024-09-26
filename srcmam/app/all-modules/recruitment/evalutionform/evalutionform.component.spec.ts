import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalutionformComponent } from './evalutionform.component';

describe('EvalutionformComponent', () => {
  let component: EvalutionformComponent;
  let fixture: ComponentFixture<EvalutionformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalutionformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalutionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
