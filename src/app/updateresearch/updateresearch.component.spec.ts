import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateresearchComponent } from './updateresearch.component';

describe('UpdateresearchComponent', () => {
  let component: UpdateresearchComponent;
  let fixture: ComponentFixture<UpdateresearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateresearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateresearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
