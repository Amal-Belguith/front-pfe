
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from './forgotpassword';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  message: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private passwordResetService: PasswordResetService
  ) {}

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
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

    const email = this.authForm.get('email')!.value;
    this.passwordResetService.requestPasswordReset(email).subscribe({
      next: (response) => {
        alert('Password reset email sent successfully');
      },
      error: (error) => {
        alert('Password reset email sent successfully');
        console.error('Password reset email sent successfully:', error);
      }
    });
  }
}