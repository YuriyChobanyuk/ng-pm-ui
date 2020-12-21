import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsService } from '../../../services/forms.service';
import { ValidationService } from '../../../services/validation.service';
import { FormGroup } from '@angular/forms';
import {
  FieldStatus,
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

  get emailStatus(): FieldStatus {
    return this.validationService.getFieldStatus(
      this.form,
      this.fields.EMAIL,
    );
  }

  get passwordStatus(): FieldStatus {
    return this.validationService.getFieldStatus(
      this.form,
      this.fields.PASSWORD,
    );
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