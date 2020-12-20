import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
import { AccessTokenPayload } from 'src/app/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  refreshToken$: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.getAccessToken(),
  );

  getAccessToken(): string {
    return localStorage.getItem('accessToken') || '';
  }

  setAccessToken(token: string): void {
    this.refreshToken$.next(token);
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
