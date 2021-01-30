import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SignUpCredentials, SignUpFormFields } from '../../../../interfaces';
import { FormsService } from '../../../services/forms.service';
import { ValidationService } from '../../../services/validation.service';
import { EmailField } from '../fields/email-field';
import { SignUpPasswordField } from '../fields/sign-up-password-field';
import { UsernameField } from '../fields/username-field';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @Output() toggleLogin: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  submitSignUp: EventEmitter<SignUpCredentials> = new EventEmitter<SignUpCredentials>();

  form!: FormGroup;
  fields = SignUpFormFields;
  email = new EmailField(this.form, this.validationService, this.fields.EMAIL);
  name = new UsernameField(this.form, this.validationService, this.fields.NAME);
  password = new SignUpPasswordField(
    this.form,
    this.validationService,
    this.fields.PASSWORD,
  );

  constructor(
    private formsService: FormsService,
    private validationService: ValidationService,
  ) {}

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
