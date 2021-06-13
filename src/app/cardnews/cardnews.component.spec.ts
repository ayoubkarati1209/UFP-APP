import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardnewsComponent } from './cardnews.component';

describe('CardnewsComponent', () => {
  let component: CardnewsComponent;
  let fixture: ComponentFixture<CardnewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardnewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
