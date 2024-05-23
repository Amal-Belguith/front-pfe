import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsIngredientComponent } from './view-details-ingredient.component';

describe('ViewDetailsIngredientComponent', () => {
  let component: ViewDetailsIngredientComponent;
  let fixture: ComponentFixture<ViewDetailsIngredientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDetailsIngredientComponent]
    });
    fixture = TestBed.createComponent(ViewDetailsIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
