import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsService } from '../../../services/forms.service';
import { ValidationService } from '../../../services/validation.service';
import { FormGroup } from '@angular/forms';
import {
  FieldStatus,
  LoginFormFields,
  SignUpCredentials,
  SignUpFormFields,
} from '../../../../interfaces';
import { Event } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private formsService: FormsService,
    private validationService: ValidationService,
  ) {}

  @Output() toggleLogin: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  submitSignUp: EventEmitter<SignUpCredentials> = new EventEmitter<SignUpCredentials>();

  form!: FormGroup;
  fields = SignUpFormFields;

  get emailStatus(): FieldStatus {
    return this.validationService.getFieldStatus(this.form, this.fields.EMAIL);
  }

  get passwordStatus(): FieldStatus {
    return this.validationService.getFieldStatus(
      this.form,
      this.fields.PASSWORD,
    );
  }

  get nameStatus(): FieldStatus {
    return this.validationService.getFieldStatus(this.form, this.fields.NAME);
  }

  ngOnInit(): void {
    this.form = this.formsService.getSignUpForm();
  }

  handleToggleLogin(): void {
    this.toggleLogin.emit();
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.submitSignUp.emit(this.form.value);
    }
  }
}
