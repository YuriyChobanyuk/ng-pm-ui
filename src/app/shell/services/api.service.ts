import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, IUser, LoginCredentials } from '../../interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly _httpClient: HttpClient) {}

  private readonly API_URL = environment.apiUrl;
  private readonly CURRENT_USER_PATH = '/users/current';
  private readonly LOGIN_PATH = '/auth/login';
  private readonly REFRESH_PATH = '/auth/refresh';

  private getUrl(path: string): string {
    return `${this.API_URL}${path}`;
  }

  getCurrentUser(): Observable<IUser> {
    const CURRENT_USER_URL = this.getUrl(this.CURRENT_USER_PATH);
    return this._httpClient.get<IUser>(CURRENT_USER_URL);
  }

  login(payload: LoginCredentials): Observable<AuthResponse> {
    const LOGIN_URL = this.getUrl(this.LOGIN_PATH);
    return this._httpClient.post<AuthResponse>(LOGIN_URL, payload);
  }

  refresh(): Observable<AuthResponse> {
    const REFRESH_URL = this.getUrl(this.REFRESH_PATH);
    return this._httpClient.get<AuthResponse>(REFRESH_URL);
  }
}
