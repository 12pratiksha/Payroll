import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertsettingComponent } from './insertsetting.component';

describe('InsertsettingComponent', () => {
  let component: InsertsettingComponent;
  let fixture: ComponentFixture<InsertsettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertsettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
