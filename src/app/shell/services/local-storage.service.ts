import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
import { AccessTokenPayload } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  deleteAccessToken(): void {
    localStorage.removeItem('accessToken');
  }

  getAccessTokenPayload(): AccessTokenPayload | null {
    const accessToken = this.getAccessToken();
    return accessToken
      ? (helper.decodeToken(accessToken) as AccessTokenPayload)
      : null;
  }
}
