import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacdatableComponent } from './spacdatable.component';

describe('SpacdatableComponent', () => {
  let component: SpacdatableComponent;
  let fixture: ComponentFixture<SpacdatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacdatableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacdatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
