import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsicTableComponent } from './esic-table.component';

describe('EsicTableComponent', () => {
  let component: EsicTableComponent;
  let fixture: ComponentFixture<EsicTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsicTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
