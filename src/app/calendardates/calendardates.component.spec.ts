import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendardatesComponent } from './calendardates.component';

describe('CalendardatesComponent', () => {
  let component: CalendardatesComponent;
  let fixture: ComponentFixture<CalendardatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendardatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendardatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
