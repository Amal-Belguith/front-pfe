import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllSurgicalComponent } from "./allsurgical.component";
describe("AllSurgicalComponent", () => {
  let component: AllSurgicalComponent;
  let fixture: ComponentFixture<AllSurgicalComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AllSurgicalComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllSurgicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
