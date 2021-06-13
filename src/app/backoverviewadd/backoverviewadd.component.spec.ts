import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackoverviewaddComponent } from './backoverviewadd.component';

describe('BackoverviewaddComponent', () => {
  let component: BackoverviewaddComponent;
  let fixture: ComponentFixture<BackoverviewaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackoverviewaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackoverviewaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
