import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginFormFields } from '../../../../interfaces';
import { ValidationService } from '../../../services/validation.service';
import { EmailField } from '../fields/email-field';
import { LoginPasswordField } from '../fields/login-password-field';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
  ) {}

  getLoginForm(): FormGroup {
    return this.fb.group(
      {
        [LoginFormFields.EMAIL]: ['', [Validators.required, Validators.email]],
        [LoginFormFields.PASSWORD]: ['', Validators.required],
      },
      {
        updateOn: 'blur',
      },
    );
  }

  getEmailField(form: FormGroup): EmailField {
    return new EmailField(form, this.validationService, LoginFormFields.EMAIL);
  }

  getPasswordField(form: FormGroup): LoginPasswordField {
    return new LoginPasswordField(
      form,
      this.validationService,
      LoginFormFields.PASSWORD,
    );
  }
}
