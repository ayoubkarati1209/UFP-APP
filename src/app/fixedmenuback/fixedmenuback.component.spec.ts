import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedmenubackComponent } from './fixedmenuback.component';

describe('FixedmenubackComponent', () => {
  let component: FixedmenubackComponent;
  let fixture: ComponentFixture<FixedmenubackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedmenubackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedmenubackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
