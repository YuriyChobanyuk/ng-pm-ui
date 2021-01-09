import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import Spy = jasmine.Spy;
import { ACCESS_TOKEN_KEY } from '../../shared/constants';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem']);
  });

  it('should return accessToken from local storage', () => {
    const accessToken = 'test access token';
    const getItemSpy = spyOn(localStorage, 'getItem').and.returnValue(
      accessToken,
    );

    const token = service.getAccessToken();

    expect(getItemSpy).toHaveBeenCalledWith(ACCESS_TOKEN_KEY);
    expect(token).toBe(accessToken);
  });

  it('should set access token to local storage', () => {
    const accessToken = 'new access token';
    const setItemSpy = spyOn(localStorage, 'setItem');

    service.setAccessToken(accessToken);

    expect(setItemSpy).toHaveBeenCalledOnceWith(ACCESS_TOKEN_KEY, accessToken);
  });
});
