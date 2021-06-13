import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacpageComponent } from './spacpage.component';

describe('SpacpageComponent', () => {
  let component: SpacpageComponent;
  let fixture: ComponentFixture<SpacpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
