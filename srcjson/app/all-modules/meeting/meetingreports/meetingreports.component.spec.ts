import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingreportsComponent } from './meetingreports.component';

describe('MeetingreportsComponent', () => {
  let component: MeetingreportsComponent;
  let fixture: ComponentFixture<MeetingreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
