import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService){
    
  }

  ngOnInit(): void {
    
    if(this.authService.isLoggedIn){
      console.log("User signed in")
      this.router.navigate([''])
    }else{
      console.log("User is not signed in")
      this.createLoginForm();
    }
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login(){
    if(this.loginForm.valid){
      this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)
    }
  }
}
