import { TestRequest } from '@angular/common/http/testing';

export const respondUnauthorized = (req: TestRequest): void => {
  req.flush('Authorization error', {
    status: 401,
    statusText: 'Unauthorized',
  });
};
