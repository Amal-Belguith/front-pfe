import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PasswordResetService } from '../forgot-password/forgotpassword';
@Component({
  selector: 'app-locked',
  templateUrl: './locked.component.html',
  styleUrls: ['./locked.component.scss'],
})
export class LockedComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  hide = true;
  token!: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private resetService: PasswordResetService
  ) {}

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      password: ['', [Validators.required]],
    });

    // Récupérer le token de l'URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('token is :', this.token);
    });
  }

  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.authForm.invalid) {
      return;
    }

    const newPassword = this.authForm.get('password')!.value;
    this.resetService.resetPassword(this.token, newPassword).subscribe({
      next: (response) => {
        alert('Password has been reset successfully.');
        this.router.navigate(['/authentication/signin']);
      },
      error: (error) => {
        alert('Password has been reset successfully.');
        console.error('Password has been reset successfully:', error);
        this.router.navigate(['/authentication/signin']);
      }
    });
  }
}
