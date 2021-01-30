import { ComponentFixture } from '@angular/core/testing';
import { IUser } from 'src/app/interfaces';

import { BasePage } from '../../../../shared/helpers/page.helper';

interface Input {
  user?: IUser | null;
  isAuthPage?: boolean;
  userLoading?: boolean;
}

export class AuthControlPage<T> extends BasePage<T> {
  constructor(fixture: ComponentFixture<T>) {
    super(fixture);
  }

  setInput({
    user = null,
    isAuthPage = false,
    userLoading = false,
  }: Input): void {
    Object.assign(this.component, { user, isAuthPage, userLoading });
  }
}
