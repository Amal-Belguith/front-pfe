import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsMedicationComponent } from './view-details-medication.component';

describe('ViewDetailsMedicationComponent', () => {
  let component: ViewDetailsMedicationComponent;
  let fixture: ComponentFixture<ViewDetailsMedicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDetailsMedicationComponent]
    });
    fixture = TestBed.createComponent(ViewDetailsMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
