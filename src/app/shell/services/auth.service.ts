import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AuthResponse,
  IUser,
  LoginCredentials,
  SignUpCredentials,
} from '../../interfaces';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../store/auth/actions';
import { BEARER, locations } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  logout(): void {
    this.localStorageService.deleteAccessToken();
    this.store.dispatch(logout());
    this.router.navigateByUrl(locations.AUTH);
  }
}
