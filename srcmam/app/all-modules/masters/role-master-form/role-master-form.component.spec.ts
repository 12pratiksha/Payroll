import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMasterFormComponent } from './role-master-form.component';

describe('RoleMasterFormComponent', () => {
  let component: RoleMasterFormComponent;
  let fixture: ComponentFixture<RoleMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleMasterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
