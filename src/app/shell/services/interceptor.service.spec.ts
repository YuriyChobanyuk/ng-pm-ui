import { TestBed } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ApiService } from './api.service';
import { endpoints } from '../../shared/constants';
import { UserRole } from '../../interfaces';
import { authActions, authSelectors } from '../store/auth';
import { Subject } from 'rxjs';
import { respondUnauthorized } from '../../shared/helpers/http.helpers';

describe('InterceptorService', () => {
  type AuthServiceSpy = jasmine.SpyObj<AuthService>;

  let service: InterceptorService;
  let httpMock: HttpTestingController;
  let mockStore: MockStore;
  let authServiceSpy: AuthServiceSpy;
  let apiService: ApiService;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthHeader']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        ApiService,
        provideMockStore({}),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptorService,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(HTTP_INTERCEPTORS).find(
      (interceptor: HttpInterceptor) => {
        return interceptor instanceof InterceptorService;
      },
    ) as InterceptorService;
    httpMock = TestBed.inject(HttpTestingController);
    mockStore = TestBed.inject(MockStore);
    apiService = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should append authorisation header', () => {
    const token = 'test token';
    const testUser = {
      role: UserRole.USER,
      img_path: '',
      name: 'John Doe',
      id: 'user_id',
      email: 'some@mail.com',
    };

    authServiceSpy.getAuthHeader.and.returnValue(token);
    apiService.currentUserRequest().subscribe((user) => {
      expect(user).toEqual(testUser);
    });

    const req = httpMock.expectOne(endpoints.CURRENT_USER);
    req.flush(testUser);

    expect(req.request.headers.get('Authorization')).toBe(token);
  });

  it('should retry the request when unauthorized', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const refreshedToken = 'refreshed token';
    const refreshSubj$ = new Subject();
    authServiceSpy.tokenRefreshed$ = refreshSubj$;
    mockStore.overrideSelector(authSelectors.refreshing, false);

    apiService.currentUserRequest().subscribe(() => {});
    const req = httpMock.expectOne(endpoints.CURRENT_USER);
    respondUnauthorized(req);

    expect(dispatchSpy).toHaveBeenCalledOnceWith(authActions.refresh());

    authServiceSpy.getAuthHeader.and.returnValue(refreshedToken);
    refreshSubj$.next();
    const retryReq = httpMock.expectOne(endpoints.CURRENT_USER);

    expect(authServiceSpy.getAuthHeader).toHaveBeenCalledTimes(2);
    expect(retryReq.request.headers.get('Authorization')).toBe(refreshedToken);
    expect(retryReq.request.url).toBe(req.request.url);
  });

  it('should not dispatch refresh when already refreshing', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    mockStore.overrideSelector(authSelectors.refreshing, true);

    apiService.currentUserRequest().subscribe(() => {});

    const req = httpMock.expectOne(endpoints.CURRENT_USER);
    respondUnauthorized(req);

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should throw when refresh returned unauthorized', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    mockStore.overrideSelector(authSelectors.refreshing, false);

    apiService.refreshRequest().subscribe(
      () => {},
      (error) => {
        expect(error).toBeInstanceOf(HttpErrorResponse);
      },
    );

    const req = httpMock.expectOne(endpoints.REFRESH);
    respondUnauthorized(req);

    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
