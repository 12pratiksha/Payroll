import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidentFundTableComponent } from './provident-fund-table.component';

describe('ProvidentFundTableComponent', () => {
  let component: ProvidentFundTableComponent;
  let fixture: ComponentFixture<ProvidentFundTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidentFundTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidentFundTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
