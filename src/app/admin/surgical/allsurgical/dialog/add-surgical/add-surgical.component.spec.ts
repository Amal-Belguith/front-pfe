import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddSurgicalComponent } from "./add-surgical.component";
describe("AddSurgicalComponent", () => {
  let component: AddSurgicalComponent;
  let fixture: ComponentFixture<AddSurgicalComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddSurgicalComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AddSurgicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
