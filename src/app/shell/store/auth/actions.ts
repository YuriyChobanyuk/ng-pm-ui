import { LoginCredentials } from '../../../interfaces';

export namespace AuthActions {
  const PREFIX = '[AUTH]';

  export class GetUser {
    static readonly type = `${PREFIX} Get User`;
  }

  export class Login {
    static readonly type = `${PREFIX} Login`;

    constructor(public payload: LoginCredentials) {}
  }

  export class Refresh {
    static readonly type = `${PREFIX} Refresh`;
  }
}
