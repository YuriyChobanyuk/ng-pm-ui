import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { INVALID, INVALID_EMAIL, REQUIRED } from '../../common/constants';
import { ValidationStatus } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  email(formControl: FormControl): ValidationErrors | null {
    return Validators.email(formControl)
      ? {
          email: INVALID_EMAIL,
        }
      : null;
  }

  required(formControl: FormControl): ValidationErrors | null {
    return Validators.required(formControl)
      ? {
          required: REQUIRED,
        }
      : null;
  }

  getValidationMessage(errors: ValidationErrors | null): string {
    if (!errors) {
      return '';
    }
    return Object.values(errors)[0];
  }

  getFieldInvalid(formControl: AbstractControl): boolean {
    return formControl.touched && formControl.status === INVALID;
  }

  getValidationStatus(formGroup: FormGroup): ValidationStatus {
    return Object.keys(formGroup.controls).reduce((acc, controlKey) => {
      acc.set(controlKey, {
        invalid: this.getFieldInvalid(formGroup.controls[controlKey]),
        error: this.getValidationMessage(
          formGroup.controls[controlKey]?.errors,
        ),
      });
      return acc;
    }, new Map());
  }
}
