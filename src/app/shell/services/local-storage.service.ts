import { Injectable } from '@angular/core';

import { ACCESS_TOKEN_KEY } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || '';
  }

  setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  deleteAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}
