import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApfComponent } from './apf.component';

describe('ApfComponent', () => {
  let component: ApfComponent;
  let fixture: ComponentFixture<ApfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
