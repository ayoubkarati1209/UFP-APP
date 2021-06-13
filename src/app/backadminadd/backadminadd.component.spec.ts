import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackadminaddComponent } from './backadminadd.component';

describe('BackadminaddComponent', () => {
  let component: BackadminaddComponent;
  let fixture: ComponentFixture<BackadminaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackadminaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackadminaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
