import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { LoginResponse } from "../models/login-response.model";
import { LocalStorageUtil } from "../utils/local-storage.util";
import { User } from "../models/user.model";
import { LoginRestService } from "./rest/login-rest.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private loginRest: LoginRestService,
    private storage: LocalStorageUtil
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.loginRest.login(email, password).pipe(
      tap((response) => {
        console.log(response);
        
        this.storage.setItem('auth-token', response.token);
        this.storage.setItem('email', response.email);
      })
    );
  }

  register(user: User) {
    return this.loginRest.register(user).pipe(
      tap((response) => {
        console.log(response);
        
        this.storage.setItem('auth-token', response.token);
        this.storage.setItem('email', response.email);
      })
    );
  }

  logout(): void {
    this.storage.removeItem('auth-token');
    this.storage.removeItem('email');
  }

  isLoggedIn(): boolean {
    return (
      this.storage.getItem('auth-token') !== null &&
      this.storage.getItem('email') !== null
    );
  }
}
