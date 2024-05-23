import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DeleteIngredientComponent } from "./delete.component";
describe("DeleteIngredientComponent", () => {
  let component: DeleteIngredientComponent;
  let fixture: ComponentFixture<DeleteIngredientComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeleteIngredientComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
