import { Component, OnInit } from '@angular/core';
import { LoginCredentials, SignUpCredentials } from '../../../interfaces';
import { select, Store } from '@ngrx/store';
import { authActions, authSelectors } from '../../store/auth';
import { AppState } from '../../store/rootState';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  isLogin = true;
  userLoading$ = this.store.pipe(select(authSelectors.loading));
  toggleIsLogin(): void {
    this.isLogin = !this.isLogin;
  }

  handleLoginSubmit(credentials: LoginCredentials): void {
    this.store.dispatch(authActions.login({ credentials }));
  }

  handleSignUpSubmit(credentials: SignUpCredentials): void {
    this.store.dispatch(authActions.signUp({ credentials }));
  }

  ngOnInit(): void {}
}
