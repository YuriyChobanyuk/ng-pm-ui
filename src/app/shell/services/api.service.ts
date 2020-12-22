import { Injectable } from '@angular/core';
import { endpoints } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  private getUrl = (path: string): string => {
    return `${endpoints.API_URL}${path}`;
  };

  get loginEndpoint(): string {
    return this.getUrl(endpoints.LOGIN);
  }

  get currentUserEndpoint(): string {
    return this.getUrl(endpoints.CURRENT_USER);
  }

  get refreshEndpoint(): string {
    return this.getUrl(endpoints.REFRESH);
  }

  get signUpEndpoint(): string {
    return this.getUrl(endpoints.SIGN_UP);
  }
}
