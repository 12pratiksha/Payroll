import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfshComponent } from './sfsh.component';

describe('SfshComponent', () => {
  let component: SfshComponent;
  let fixture: ComponentFixture<SfshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfshComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
