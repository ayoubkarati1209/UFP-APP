import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIpoComponent } from './home-ipo.component';

describe('HomeIpoComponent', () => {
  let component: HomeIpoComponent;
  let fixture: ComponentFixture<HomeIpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeIpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeIpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
