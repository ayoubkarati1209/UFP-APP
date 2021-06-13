import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackspacaddComponent } from './backspacadd.component';

describe('BackspacaddComponent', () => {
  let component: BackspacaddComponent;
  let fixture: ComponentFixture<BackspacaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackspacaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackspacaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
