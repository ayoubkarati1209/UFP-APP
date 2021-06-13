import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResearchComponent } from './home-research.component';

describe('HomeResearchComponent', () => {
  let component: HomeResearchComponent;
  let fixture: ComponentFixture<HomeResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeResearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
