import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthService } from '@core';
import { Role } from '../user.Model';
import { authenticateservice } from '../authentication.service';
import { AuthenticationRequest } from '../authentication.request';
import { AuthenticationResponse } from '../authentication.response';
import { UserDetails } from '../userdetails';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
 
  authenticationRequest: AuthenticationRequest = {};
  
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: authenticateservice
  ) {
    super();
  }

  ngOnInit() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  

  get f() {
    return this.authForm.controls;
  }
  
  onSubmit() {
    console.log("****", this.authForm.value);
    this.authService.authenticate(this.authForm.value).subscribe(
      (Response: any) => {
        console.log(Response);
  
        // Stockage des tokens dans le local storage
        localStorage.setItem('accessToken', Response.access_token);
        localStorage.setItem('refreshToken', Response.refresh_token);
  
        // Récupération des détails de l'utilisateur
        this.authService.getUserDetails().subscribe(
          (userDetails: UserDetails) => {
            localStorage.setItem('currentUser', JSON.stringify(userDetails));
            console.log(userDetails);
            const role = userDetails.role 
            if (role === 'ADMIN') {
              this.router.navigate(['/admin/dashboard/main']);
            } else if (role === 'DOCTOR') {
              this.router.navigate(['/doctor/dashboard']);
            } else if (role === 'PATIENT') {
              this.router.navigate(['/patient/dashboard']);
            } else if (role === 'NURSE') {
              this.router.navigate(['/nurse/dashboard']);
            } 
            else {
              // Rôle inconnu, naviguer vers la page de connexion
              this.router.navigate(['/authentication/signin']);
            }
          },
          err => {
            alert("Failed to fetch user details");
            console.error(err);
          }
        );
      },
      err => {
        alert("Email or password is incorrect");
        console.error(err);
      }
    );
  }
}

  

