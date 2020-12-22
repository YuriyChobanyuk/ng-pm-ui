import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { validation } from '../../shared/constants';
import { FieldStatus } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  private getValidationMessage(control: AbstractControl | null): string {
    if (!control || !control.errors) {
      return '';
    }
    const { errors } = control;

    if (errors.email) {
      return validation.INVALID_EMAIL;
    }
    if (errors.required) {
      return validation.REQUIRED;
    }
    if (errors.minlength) {
      return `Minimal length is ${errors.minlength.requiredLength}`;
    }
    if (errors.maxlength) {
      return `Maximal length is ${errors.maxlength.requiredLength}`;
    }
    return Object.values(errors)[0];
  }

  private getFieldInvalid(control: AbstractControl | null): boolean {
    return control ? control.touched && !control.valid : false;
  }

  isInvalid(form: FormGroup, field: string): boolean {
    return this.getFieldInvalid(form.get(field));
  }

  getErrorMessage(form: FormGroup, field: string): string {
    return this.getValidationMessage(form.get(field));
  }

  getFieldStatus(form: FormGroup, field: string): FieldStatus {
    return {
      isInvalid: this.isInvalid(form, field),
      errors: this.getErrorMessage(form, field),
    };
  }
}
