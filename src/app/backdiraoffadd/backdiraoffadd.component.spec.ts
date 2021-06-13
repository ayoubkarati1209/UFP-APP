import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdiraoffaddComponent } from './backdiraoffadd.component';

describe('BackdiraoffaddComponent', () => {
  let component: BackdiraoffaddComponent;
  let fixture: ComponentFixture<BackdiraoffaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackdiraoffaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackdiraoffaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
