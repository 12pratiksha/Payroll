import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionToDBComponent } from './connection-to-db.component';

describe('ConnectionToDBComponent', () => {
  let component: ConnectionToDBComponent;
  let fixture: ComponentFixture<ConnectionToDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionToDBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionToDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
