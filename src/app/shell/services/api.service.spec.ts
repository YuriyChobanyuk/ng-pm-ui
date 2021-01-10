import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { AuthResponse, LoginCredentials, UserRole } from '../../interfaces';
import { endpoints } from '../../shared/constants';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { userStub } from '../../shared/helpers/stubs';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  const authResponse: AuthResponse = {
    token: 'AUTH_TOKEN',
    data: {
      user: {
        ...userStub,
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make login request', () => {
    const credentials: LoginCredentials = {
      email: 'some@mail.com',
      password: 'Test1234!',
    };

    service.loginRequest(credentials).subscribe((res) => {
      expect(res).toEqual(authResponse);
    });
    const loginRequest = httpMock.expectOne(endpoints.LOGIN);
    loginRequest.flush(authResponse);
    expect(loginRequest.request.method).toBe('POST');
    expect(loginRequest.request.body).toEqual(credentials);
  });

  it('should make refresh request', () => {
    service.refreshRequest().subscribe((res) => {
      expect(res).toEqual(authResponse);
    });

    const refreshRequest = httpMock.expectOne(endpoints.REFRESH);
    refreshRequest.flush(authResponse);

    expect(refreshRequest.request.method).toBe('GET');
  });
});
