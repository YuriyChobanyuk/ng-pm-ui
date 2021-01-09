import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { logout } from '../store/auth/actions';
import { Store } from '@ngrx/store';

describe('AuthService', () => {
  type ApiServiceSpy = jasmine.SpyObj<ApiService>;
  type LocalStorageServiceSpy = jasmine.SpyObj<LocalStorageService>;
  type RouterSpy = jasmine.SpyObj<Router>;

  let service: AuthService;

  beforeEach(() => {
    const apiSpy: ApiServiceSpy = jasmine.createSpyObj('ApiService', [
      'loginEndpoint',
      'currentUserEndpoint',
      'signUpEndpoint',
    ]);

    const lsSpy: LocalStorageServiceSpy = jasmine.createSpyObj(
      'LocalStorageService',
      ['getAccessToken', 'deleteAccessToken'],
    );

    const routerSpy: RouterSpy = jasmine.createSpyObj('Router', [
      'navigate',
      'navigateByUrl',
    ]);

    const storeSpy: jasmine.SpyObj<Store> = jasmine.createSpyObj('Store', [
      'dispatch',
    ]);

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
    const routerSpy = TestBed.inject(Router);
    const storeSpy = TestBed.inject(Store);
    const localStorageServiceSpy = TestBed.inject(
      LocalStorageService,
    ) as LocalStorageServiceSpy;
    const authPath = 'auth';

    service.logout();

    expect(localStorageServiceSpy.deleteAccessToken).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith(authPath);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(logout());
  });
});
