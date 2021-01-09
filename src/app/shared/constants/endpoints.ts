import { environment } from '../../../environments/environment';

export const API_URL = environment.apiUrl;
export const getUrl = (path: string): string => {
  return `${API_URL}${path}`;
};

export const CURRENT_USER = getUrl('/users/current');
export const LOGIN = getUrl('/auth/login');
export const REFRESH = getUrl('/auth/refresh');
export const SIGN_UP = getUrl('/auth/signup');
