import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncometaxdeclarationformComponent } from './incometaxdeclarationform.component';

describe('IncometaxdeclarationformComponent', () => {
  let component: IncometaxdeclarationformComponent;
  let fixture: ComponentFixture<IncometaxdeclarationformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncometaxdeclarationformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncometaxdeclarationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
