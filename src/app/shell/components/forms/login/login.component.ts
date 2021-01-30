import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginCredentials, LoginFormFields } from '../../../../interfaces';
import { FormsService } from '../../../services/forms.service';
import { ValidationService } from '../../../services/validation.service';
import { EmailField } from '../fields/email-field';
import { LoginPasswordField } from '../fields/login-password-field';

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
  fields = LoginFormFields;
  email = new EmailField(this.form, this.validationService, this.fields.EMAIL);
  password = new LoginPasswordField(
    this.form,
    this.validationService,
    this.fields.PASSWORD,
  );

  constructor(
    private formsService: FormsService,
    private validationService: ValidationService,
  ) {}

  ngOnInit(): void {
    this.form = this.formsService.getLoginForm();
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
