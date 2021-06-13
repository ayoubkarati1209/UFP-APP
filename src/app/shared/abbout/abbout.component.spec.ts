import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbboutComponent } from './abbout.component';

describe('AbboutComponent', () => {
  let component: AbboutComponent;
  let fixture: ComponentFixture<AbboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
