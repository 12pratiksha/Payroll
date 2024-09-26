import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWithIdComponent } from './edit-with-id.component';

describe('EditWithIdComponent', () => {
  let component: EditWithIdComponent;
  let fixture: ComponentFixture<EditWithIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWithIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWithIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
