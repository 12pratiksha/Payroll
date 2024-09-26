import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicySettingComponent } from './policy-setting.component';

describe('PolicySettingComponent', () => {
  let component: PolicySettingComponent;
  let fixture: ComponentFixture<PolicySettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicySettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
