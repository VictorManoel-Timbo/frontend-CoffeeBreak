import { Injectable } from "@angular/core";
import { Observable, Subject, take, tap } from "rxjs";
import { LoginResponse } from "../models/login-response.model";
import { LocalStorageUtil } from "../utils/local-storage.util";
import { User } from "../models/user.model";
import { LoginRestService } from "./rest/login-rest.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private _login: LoginRestService,
    private storage: LocalStorageUtil,
  ) { }

  private login$: Subject<any> = new Subject<any>()

  log: Observable<any> = this.login$.asObservable()

  login(email: string, password: string): void {
    this._login.login(email, password).pipe(take(1),
      tap((response) => {
        this.storage.setItem('auth-token', response.token);
        this.storage.setItem('email', response.email);
        this.storage.setItem('role', response.role);
      }
      )
    ).subscribe({
      next: (response) => {
        this.login$.next(response);
      },
      error: (err) => {
        this.login$.error(err);
      }
    });
  }

  register(user: User): void {
    this._login.register(user).pipe(take(1),
      tap((response) => {
        this.storage.setItem('auth-token', response.token);
        this.storage.setItem('email', response.email);
        this.storage.setItem('role', response.role);
      }
      )
    ).subscribe({
      next: (response) => {
        this.login$.next(response);
      },
      error: (err) => {
        this.login$.error(err);
      }
    });
  }

  logout(): void {
    this.storage.removeItem('auth-token');
    this.storage.removeItem('email');
    this.storage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return (
      this.storage.getItem('auth-token') !== null &&
      this.storage.getItem('email') !== null &&
      this.storage.getItem('role') !== null
    );
  }
}
