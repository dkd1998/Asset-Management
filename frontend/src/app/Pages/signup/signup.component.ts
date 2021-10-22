import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupService } from 'src/app/Services/SignUp/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  router: any;

  constructor(private signupService: SignupService,private fb: FormBuilder,) { }

  ngOnInit() {
  }

  signupForm = this.fb.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  })

  get email() {
    return this.signupForm.get("email");
  }
  get name() {
    return this.signupForm.get("name");
  }
  get password() {
    return this.signupForm.get("password");
  }

  getEmailError() {
    if (this.email.hasError("required")) {
      return "Email is required";
    }
    if (this.email.hasError("email")) {
      return "Invalid email";
    }
    return null;
  }

  getNameError() {
    if (this.name.hasError("required")) {
      return "Name is required";
    }
    if (this.email.hasError("name")) {
      return "Invalid name";
    }
    return null;
  }

  getPasswordError() {
    if (this.password.hasError("required")) {
      return "Password is required";
    }
    if (this.password.hasError("minlength")) {
      return "Password should have at least 6 characters";
    }
    return null;
  }

  signup(){
    console.log("signed up")
    if (this.email.valid && this.name.valid && this.password.valid){
      try{
        const { email, password, name } = this.signupForm.value;
        const data = {
          username: name,
          email: email,
          password: password
        }
        console.log(data)

        this.signupService.signup(data).subscribe(
          res => {
            console.log(res)
            alert("Registration Recorded. Wait for admin to approve");
          },
          error => alert(error.error.email[0])
        );
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      alert("Details are invalid")
    }
    }
  }
