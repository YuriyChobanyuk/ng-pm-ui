import { TestBed } from '@angular/core/testing';

import { ACCESS_TOKEN_KEY } from '../../shared/constants';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
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

  it('should return empty token if no value in storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const token = service.getAccessToken();

    expect(token).toBe('');
  });

  it('should set access token to local storage', () => {
    const accessToken = 'new access token';
    const setItemSpy = spyOn(localStorage, 'setItem');

    service.setAccessToken(accessToken);

    expect(setItemSpy).toHaveBeenCalledOnceWith(ACCESS_TOKEN_KEY, accessToken);
  });
});
