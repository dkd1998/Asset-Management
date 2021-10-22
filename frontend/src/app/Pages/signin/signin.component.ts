import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/Services/SignIn/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder, private signinService: SigninService, private router: Router) { }

  ngOnInit() {
  }

  signinForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]]
  })

  get username() {
    return this.signinForm.get("username");
  }
  get password() {
    return this.signinForm.get("password");
  }

  getNameError() {
    if (this.username.hasError("required")) {
      return "Name is required";
    }
    return "";
  }

login() {
    if (this.username.valid && this.password.valid) {
      try {
        const { username, password } = this.signinForm.value;
        const data ={
          username: username,
          password: password
      }
      console.log(data)
        if(data) {
          this.signinService.auth(data).subscribe(
            res => {
              localStorage.setItem("username", username);
              localStorage.setItem("email", res.user.email);
              localStorage.setItem("employeeId",res.user.id);
              localStorage.setItem("is_active",res.user.is_active);
              localStorage.setItem("authToken", res.token);
              localStorage.setItem("is_superuser", res.user.is_superuser)
              console.log("Signin with Name-Password successful");
              this.router.navigate(['/home']);
            },
            err=>{
              alert("Invalid Username or Password");
            }
          );
         
        }
      } catch (error) {
        console.log("error");
        
      }
    }
    else {
      alert("Details are invalid")
    }
  }
}
