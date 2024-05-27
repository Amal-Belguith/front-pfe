import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { authenticateservice } from '../authentication.service';
import { User } from '../user.Model';
import { AuthenticationResponse } from '../authentication.response';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticateservice: authenticateservice
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }
  /*onubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      this.router.navigate(['/admin/dashboard/main']);
    }
  }*/
  onSubmit() {
   
    const formData = this.authForm.value;
    
    const newUser: User = {
      user_ky:null,
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      role: formData.role,

    };
    
    this.authenticateservice.register(newUser).subscribe({
      next: (Response:AuthenticationResponse) => {
        console.log('User added successfully:', newUser);
        alert('User added successfully');
        if(Response){
          this.router.navigate(['authentication/signin']);
        }
      },
      error: (error) => {
        console.error('Error adding user:', error);
        alert('Error adding user. Please try again.');
      }
    });
}

  cancel() {
    this.authForm.reset(); 
  }
}
