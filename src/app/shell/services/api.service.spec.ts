import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { AuthResponse, LoginCredentials, UserRole } from '../../interfaces';
import { endpoints } from '../../shared/constants';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  const authResponse: AuthResponse = {
    token: 'AUTH_TOKEN',
    data: {
      user: {
        role: UserRole.USER,
        img_path: '',
        name: 'John Doe',
        id: 'user_id',
        email: 'some@mail.com',
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should make login request', () => {
    const credentials: LoginCredentials = {
      email: 'some@mail.com',
      password: 'Test1234!',
    };

    service.loginRequest(credentials).subscribe((res) => {
      expect(res).toEqual(authResponse);
    });

    const loginRequest = httpTestingController.expectOne(endpoints.LOGIN);

    loginRequest.flush(authResponse);

    httpTestingController.verify();
  });

  it('should make refresh request', () => {
    service.refreshRequest().subscribe((res) => {
      expect(res).toEqual(authResponse);
    });

    const refreshRequest = httpTestingController.expectOne(endpoints.REFRESH);

    refreshRequest.flush(authResponse);

    httpTestingController.verify();
  });
});
