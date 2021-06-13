import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackadmindetailsaddComponent } from './backadmindetailsadd.component';

describe('BackadmindetailsaddComponent', () => {
  let component: BackadmindetailsaddComponent;
  let fixture: ComponentFixture<BackadmindetailsaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackadmindetailsaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackadmindetailsaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
