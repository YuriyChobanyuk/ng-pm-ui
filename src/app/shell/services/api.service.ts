import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AuthResponse,
  IUser,
  LoginCredentials,
  SignUpCredentials,
} from '../../interfaces';
import { endpoints } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  currentUserRequest(): Observable<IUser> {
    return this.http.get<IUser>(endpoints.CURRENT_USER);
  }

  loginRequest(payload: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(endpoints.LOGIN, payload, {
      withCredentials: true,
    });
  }

  refreshRequest(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(endpoints.REFRESH, {
      withCredentials: true,
    });
  }

  signUpRequest(payload: SignUpCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(endpoints.SIGN_UP, payload, {
      withCredentials: true,
    });
  }
}
