import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyspacComponent } from './modifyspac.component';

describe('ModifyspacComponent', () => {
  let component: ModifyspacComponent;
  let fixture: ComponentFixture<ModifyspacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyspacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyspacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
