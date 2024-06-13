import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { MedicalRecordComponent } from "./medical-records.component";

describe("MedicalRecordComponent", () => {
  let component: MedicalRecordComponent;
  let fixture: ComponentFixture<MedicalRecordComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MedicalRecordComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
