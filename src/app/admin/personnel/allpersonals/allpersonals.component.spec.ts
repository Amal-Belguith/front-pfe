import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllpersonalsComponent } from "./allpersonals.component";
describe("AllpersonalsComponent", () => {
  let component: AllpersonalsComponent;
  let fixture: ComponentFixture<AllpersonalsComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AllpersonalsComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllpersonalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
