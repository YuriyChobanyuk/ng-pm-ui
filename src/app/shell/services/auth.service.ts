import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { BEARER, locations } from '../../shared/constants';
import { logout } from '../store/auth/actions';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenRefreshed$ = new Subject();

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store,
  ) {}

  get accessToken(): string {
    return this.localStorageService.getAccessToken();
  }

  set accessToken(token: string) {
    this.localStorageService.setAccessToken(token);
  }

  getAuthHeader(): string {
    return `${BEARER} ${this.accessToken}`;
  }

  deleteAccessToken(): void {
    this.localStorageService.deleteAccessToken();
  }

  redirectToLoginPage(): void {
    this.router.navigateByUrl(locations.AUTH).catch((e) => {
      console.error(e);
    });
  }

  logout(): void {
    this.deleteAccessToken();
    this.store.dispatch(logout());
    this.redirectToLoginPage();
  }
}
