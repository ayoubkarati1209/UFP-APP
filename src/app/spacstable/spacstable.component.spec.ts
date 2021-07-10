import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacstableComponent } from './spacstable.component';

describe('SpacstableComponent', () => {
  let component: SpacstableComponent;
  let fixture: ComponentFixture<SpacstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacstableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
