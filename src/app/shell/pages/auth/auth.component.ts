import { Component, OnInit } from '@angular/core';
import { LoginCredentials, SignUpCredentials } from '../../../interfaces';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private store: Store) {}

  isLogin = true;

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
