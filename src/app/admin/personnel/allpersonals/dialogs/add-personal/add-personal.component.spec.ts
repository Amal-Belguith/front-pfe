import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddPersonalComponent } from "./add-personal.component";
describe("AddPersonalComponent", () => {
  let component: AddPersonalComponent;
  let fixture: ComponentFixture<AddPersonalComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddPersonalComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
