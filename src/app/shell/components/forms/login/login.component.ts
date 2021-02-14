import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginCredentials } from '../../../../interfaces';
import { EmailField } from '../fields/email-field';
import { LoginPasswordField } from '../fields/login-password-field';
import { LoginFormService } from './login-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() toggleLogin: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  submitLogin: EventEmitter<LoginCredentials> = new EventEmitter<LoginCredentials>();

  form!: FormGroup;
  email!: EmailField;
  password!: LoginPasswordField;

  constructor(private formService: LoginFormService) {}

  ngOnInit(): void {
    this.form = this.formService.getLoginForm();
    this.email = this.formService.getEmailField(this.form);
    this.password = this.formService.getPasswordField(this.form);
  }

  handleToggleLogin(): void {
    this.toggleLogin.emit();
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.submitLogin.emit(this.form.value);
    }
  }
}
