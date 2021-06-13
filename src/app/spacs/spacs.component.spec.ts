import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacsComponent } from './spacs.component';

describe('SpacsComponent', () => {
  let component: SpacsComponent;
  let fixture: ComponentFixture<SpacsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
