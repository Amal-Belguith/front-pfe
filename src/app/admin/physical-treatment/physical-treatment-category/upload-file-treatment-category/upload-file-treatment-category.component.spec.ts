import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFiletrcatComponent } from './upload-file-treatment-category.component';

describe('UploadFiletrcatComponent', () => {
  let component: UploadFiletrcatComponent;
  let fixture: ComponentFixture<UploadFiletrcatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadFiletrcatComponent]
    });
    fixture = TestBed.createComponent(UploadFiletrcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
