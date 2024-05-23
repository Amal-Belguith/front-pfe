import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicationComponent } from './edit-medication.component';

describe('EditMedicationComponent', () => {
  let component: EditMedicationComponent;
  let fixture: ComponentFixture<EditMedicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMedicationComponent]
    });
    fixture = TestBed.createComponent(EditMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
