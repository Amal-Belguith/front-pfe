import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DeleteSurgicalComponent } from "./delete.component";
describe("DeleteSurgicalComponent", () => {
  let component: DeleteSurgicalComponent;
  let fixture: ComponentFixture<DeleteSurgicalComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeleteSurgicalComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSurgicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
