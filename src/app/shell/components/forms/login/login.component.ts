import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsService } from '../../../services/forms.service';
import { ValidationService } from '../../../services/validation.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
  LoginCredentials,
  LoginFormFields,
} from '../../../../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formsService: FormsService,
    private validationService: ValidationService,
  ) {}

  @Output() toggleLogin: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  submitLogin: EventEmitter<LoginCredentials> = new EventEmitter<LoginCredentials>();

  form!: FormGroup;
  fields = LoginFormFields;

  get email(): AbstractControl | null {
    return this.form.get(this.fields.EMAIL);
  }

  get emailInvalid(): boolean {
    return this.validationService.getFieldInvalid(this.email);
  }

  get emailErrors(): string | null {
    switch (true) {
      case this.email?.errors?.required:
        return 'Email is required';
      case this.email?.errors?.email:
        return 'Should be a valid email';
      default:
        return null;
    }
  }

  get password(): AbstractControl | null {
    return this.form.get(this.fields.PASSWORD);
  }

  get passwordInvalid(): boolean {
    return this.validationService.getFieldInvalid(this.password);
  }

  get passwordErrors(): string | null {
    switch (true) {
      case this.password?.errors?.required:
        return 'Password is required';
      default:
        return null;
    }
  }

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
