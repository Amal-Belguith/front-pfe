import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CarePlanComponent } from "./careplan.component";

describe("CarePlanComponent", () => {
  let component: CarePlanComponent;
  let fixture: ComponentFixture<CarePlanComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CarePlanComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
