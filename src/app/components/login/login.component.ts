import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    let email = this.loginForm.value.email;
    let pass = this.loginForm.value.password;
    console.log(
      "TCL: LoginComponent -> onLogin -> this.loginForm",
      this.loginForm
    );
    this.isLoading = true;
    this.authService.loginUser(email, pass).subscribe(
      res => {
        if (res) {
          this.authService.processToken(res.token);
          this.isLoading = false;
        }
      },
      err => {
        console.log("evo ga error: ", err);
        this.isLoading = false;
      }
    );
  }
}
