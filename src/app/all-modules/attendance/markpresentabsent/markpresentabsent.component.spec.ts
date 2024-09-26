import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkpresentabsentComponent } from './markpresentabsent.component';

describe('MarkpresentabsentComponent', () => {
  let component: MarkpresentabsentComponent;
  let fixture: ComponentFixture<MarkpresentabsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkpresentabsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkpresentabsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
