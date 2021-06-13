import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacDetComponent } from './spac-det.component';

describe('SpacDetComponent', () => {
  let component: SpacDetComponent;
  let fixture: ComponentFixture<SpacDetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacDetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
