import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CarePlansComponent } from "./careplans.component";

describe("CarePlansComponent", () => {
  let component: CarePlansComponent;
  let fixture: ComponentFixture<CarePlansComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CarePlansComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
