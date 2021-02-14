import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SignUpFormFields } from '../../../../interfaces';
import { validation } from '../../../../shared/constants';
import { ValidationService } from '../../../services/validation.service';
import { EmailField } from '../fields/email-field';
import { SignUpPasswordField } from '../fields/sign-up-password-field';
import { UsernameField } from '../fields/username-field';

@Injectable({
  providedIn: 'root',
})
export class SignUpFormService {
  form?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
  ) {}

  createForm(): FormGroup {
    this.form = this.fb.group(
      {
        [SignUpFormFields.EMAIL]: ['', [Validators.required, Validators.email]],
        [SignUpFormFields.PASSWORD]: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
            Validators.pattern(validation.PASSWORD_REG_EXP),
          ],
        ],
        [SignUpFormFields.NAME]: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
      },
      {
        updateOn: 'blur',
      },
    );

    return this.form;
  }

  createEmailField(form: FormGroup): EmailField {
    return new EmailField(form, this.validationService, SignUpFormFields.EMAIL);
  }

  createUsernameField(form: FormGroup): UsernameField {
    return new UsernameField(
      form,
      this.validationService,
      SignUpFormFields.NAME,
    );
  }

  createPasswordField(form: FormGroup): SignUpPasswordField {
    return new SignUpPasswordField(
      form,
      this.validationService,
      SignUpFormFields.PASSWORD,
    );
  }
}
