import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../store/auth/actions';
import { BEARER, locations } from '../../shared/constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store,
  ) {}

  tokenRefreshed$ = new Subject();

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
    this.router.navigateByUrl(locations.AUTH);
  }

  logout(): void {
    this.deleteAccessToken();
    this.store.dispatch(logout());
    this.redirectToLoginPage();
  }
}
