import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsSurgicalComponent } from './view-details-surgical.component';

describe('ViewDetailsSurgicalComponent', () => {
  let component: ViewDetailsSurgicalComponent;
  let fixture: ComponentFixture<ViewDetailsSurgicalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDetailsSurgicalComponent]
    });
    fixture = TestBed.createComponent(ViewDetailsSurgicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
