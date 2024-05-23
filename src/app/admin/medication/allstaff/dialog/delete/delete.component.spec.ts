import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DeleteMedicationComponent } from "./delete.component";
describe("DeleteMedicationComponent", () => {
  let component: DeleteMedicationComponent;
  let fixture: ComponentFixture<DeleteMedicationComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeleteMedicationComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
