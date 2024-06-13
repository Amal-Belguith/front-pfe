import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { authenticateservice } from 'app/authentication/authentication.service';
import { User } from 'app/authentication/user.Model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settingsForm!: UntypedFormGroup;
  user_ky: number | null = null;
  hide = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: authenticateservice,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { 
    this.settingsForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.authService.getUserDetails().subscribe((user) => {
      console.log('User details:', user); 
      this.user_ky = user.user_ky; 
      this.settingsForm.patchValue({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: '' // Keep password field empty
      });
    }, (error) => {
      console.error('Error loading user details:', error); 
    });
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      const formData = this.settingsForm.value;
      const updatedUser: any = {
        user_ky: this.user_ky, 
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email
      };

      // Include password only if it is provided
      if (formData.password) {
        updatedUser.password = formData.password;
      }

      // Check for null before calling updateUser
      if (this.user_ky !== null) {
        this.authService.updateUser(this.user_ky, updatedUser).subscribe({
          next: () => {
            this.showNotification('snackbar-success', 'Data Updated successfully', 'bottom', 'center');
          },
          error: (error) => {
            this.showNotification('snackbar-error', 'Error Updating Data', 'bottom', 'center');
          }
        });
      } else {
        this.showNotification('snackbar-error', 'Error Updating Data', 'bottom', 'center');
      }
    } else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
    }
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}



