import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const LOGIN_URL = environment.loginUrl;
const LOGOUT_URL = environment.logoutUrl;

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isAuth = false;
  private token = "";

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(email: string, password: string) {
    return this.http.post<{ tokenType: string; token: string }>(
      LOGIN_URL + "?" + "username=" + email + "&password=" + password,
      {}
    );
  }

  processToken(token) {
    this.token = token;
    if (this.token) {
      this.isAuth = true;
      localStorage.setItem("token-digital-cube-todo-js", this.token);
      this.router.navigate(["/"]);
    }
  }

  autoAuthUser() {
    const oldToken = localStorage.getItem("token-digital-cube-todo-js");
    if (!oldToken) return;

    this.token = oldToken;
    this.isAuth = true;
  }

  getIsAuth() {
    return this.isAuth;
  }

  logoutUser() {
    return this.http.post(LOGOUT_URL, {});
  }

  clearAuthData() {
    localStorage.removeItem("token-digital-cube-todo-js");
  }

  getToken() {
    return this.token;
  }
}
