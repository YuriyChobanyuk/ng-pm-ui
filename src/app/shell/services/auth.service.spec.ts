import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { logout } from '../store/auth/actions';
import { Store } from '@ngrx/store';

describe('AuthService', () => {
  let service: AuthService;
  let apiSpy: jasmine.SpyObj<ApiService>;
  let lsSpy: jasmine.SpyObj<LocalStorageService>;
  let storeSpy: jasmine.SpyObj<Store>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj('ApiService', [
      'loginEndpoint',
      'currentUserEndpoint',
      'signUpEndpoint',
    ]);

    lsSpy = jasmine.createSpyObj('LocalStorageService', [
      'getAccessToken',
      'deleteAccessToken',
    ]);

    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: ApiService,
          useValue: apiSpy,
        },
        {
          provide: LocalStorageService,
          useValue: lsSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: Store,
          useValue: storeSpy,
        },
      ],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logout', () => {
    const authPath = 'auth';

    service.logout();

    expect(lsSpy.deleteAccessToken).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith(authPath);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(logout());
  });
});
