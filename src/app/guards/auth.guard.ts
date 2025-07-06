import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { LocalStorageUtil } from '../utils/local-storage.util';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private stogare: LocalStorageUtil
) {}

  canActivate(): boolean | UrlTree {
    const token = this.stogare.getItem('auth-token');
    if (token) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
}
