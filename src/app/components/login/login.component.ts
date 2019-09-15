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

  onLogin(email: string, password: string) {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        res => {
          if (res) {
            this.authService.processToken(res.token);
            this.isLoading = false;
          }
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
  }
}
