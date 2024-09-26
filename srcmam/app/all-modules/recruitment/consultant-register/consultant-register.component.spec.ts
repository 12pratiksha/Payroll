import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantRegisterComponent } from './consultant-register.component';

describe('ConsultantRegisterComponent', () => {
  let component: ConsultantRegisterComponent;
  let fixture: ComponentFixture<ConsultantRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
