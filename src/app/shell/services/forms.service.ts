import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginFormFields, SignUpFormFields } from '../../interfaces';
import { validation } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private fb: FormBuilder) {}

  getLoginForm(): FormGroup {
    return this.fb.group({
      [LoginFormFields.EMAIL]: ['', [Validators.required, Validators.email]],
      [LoginFormFields.PASSWORD]: ['', Validators.required],
    });
  }

  getSignUpForm(): FormGroup {
    return this.fb.group({
      [SignUpFormFields.EMAIL]: ['', [Validators.required, Validators.email]],
      [SignUpFormFields.PASSWORD]: [
        '',
        [Validators.required, Validators.pattern(validation.PASSWORD_REG_EXP)],
      ],
      [SignUpFormFields.NAME]: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
    });
  }
}