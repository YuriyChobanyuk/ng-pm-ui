import { LocalStorageService } from '../local-storage.service';

export const getLocalStorageServiceStub = (): LocalStorageService => {
  let token = 'default';
  return {
    getAccessToken: (): string => {
      return token;
    },

    setAccessToken: (newToken: string): void => {
      token = newToken;
    },

    deleteAccessToken: (): void => {
      token = '';
    },
  };
};
