import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageUtil } from '../utils/local-storage.util';

export const AdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const storage = inject(LocalStorageUtil);

  const role = storage.getItem('role');
  if (role === 'ADMIN') {
    return true;
  } else {
    router.navigate(['/dashboard']);
    return false;
  }
};
