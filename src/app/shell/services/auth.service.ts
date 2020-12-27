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
    private client: HttpClient,
    private api: ApiService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store,
  ) {}

  currentUserRequest(): Observable<IUser> {
    return this.client.get<IUser>(this.api.currentUserEndpoint);
  }

  loginRequest(payload: LoginCredentials): Observable<AuthResponse> {
    return this.client.post<AuthResponse>(this.api.loginEndpoint, payload, {
      withCredentials: true,
    });
  }

  refreshRequest(): Observable<AuthResponse> {
    return this.client.get<AuthResponse>(this.api.refreshEndpoint, {
      withCredentials: true,
    });
  }

  signUpRequest(payload: SignUpCredentials): Observable<AuthResponse> {
    return this.client.post<AuthResponse>(this.api.signUpEndpoint, payload, {
      withCredentials: true,
    });
  }

  get accessToken(): string {
    return this.localStorageService.getAccessToken();
  }

  set accessToken(token: string) {
    this.localStorageService.setAccessToken(token);
  }

  get hasAccessToken(): boolean {
    return !!this.localStorageService.getAccessToken();
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
