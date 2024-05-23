import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PersonalService } from '../allpersonals/personals.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Personal } from '../personal.model';
@Component({
  selector: 'app-add-personal',
  templateUrl: './add-personal.component.html',
  styleUrls: ['./add-personal.component.scss'],
})
export class AddPersonalComponent {
  selectedFile: File | undefined;
  returnUrl!: string;
  perForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  constructor(private fb: UntypedFormBuilder, private personalservice: PersonalService,
    private snackBar: MatSnackBar) {
    this.perForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required],
      role: ['', Validators.required],
      department: [''],
      uploadFile: [''],
    });

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Récupération du fichier sélectionné
  }

  ngOnInit(): void {
  }


  onSubmit() {

    if (this.perForm.valid) {

      const formData = this.perForm.value;

      const newPersonal: Personal = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        department: formData.department,
        uploadedFile: this.selectedFile ? this.selectedFile.name : ''

      };
      console.log('Staff Data:', newPersonal);

      this.personalservice.addPersonal(newPersonal).subscribe(
        (response) => {
          console.log('Staff added successfully:', response);
          alert('staff added successfully');
        },
        (error) => {
          console.error('Error adding Staff:', error);
        }
      );

    }
  }

  onCancel(): void {
    this.perForm.reset();
  }
}

