import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileadveffComponent } from './upload-file-adverse-effect.component';

describe('UploadFileadveffComponent', () => {
  let component: UploadFileadveffComponent;
  let fixture: ComponentFixture<UploadFileadveffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadFileadveffComponent]
    });
    fixture = TestBed.createComponent(UploadFileadveffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
