import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktrustaddComponent } from './backtrustadd.component';

describe('BacktrustaddComponent', () => {
  let component: BacktrustaddComponent;
  let fixture: ComponentFixture<BacktrustaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacktrustaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacktrustaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
