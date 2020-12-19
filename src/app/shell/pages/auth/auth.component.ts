import { Component, OnInit } from '@angular/core';
import { LoginCredentials } from '../../../interfaces';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor() {}

  isLogin = true;

  toggleIsLogin(): void {
    this.isLogin = !this.isLogin;
  }

  handleLoginSubmit(credentials: LoginCredentials): void {
    console.log({ credentials });
  }

  ngOnInit(): void {}
}
