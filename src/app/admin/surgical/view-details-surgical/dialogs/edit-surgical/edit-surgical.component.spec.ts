import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSurgicalComponent } from './edit-surgical.component';

describe('EditSurgicalComponent', () => {
  let component: EditSurgicalComponent;
  let fixture: ComponentFixture<EditSurgicalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSurgicalComponent]
    });
    fixture = TestBed.createComponent(EditSurgicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
