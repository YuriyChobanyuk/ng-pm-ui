import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { INVALID, INVALID_EMAIL, REQUIRED } from '../../common/constants';
import { FieldStatus } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  private getFormControl(form: FormGroup, field: string): AbstractControl {
    return form.controls[field];
  }

  private getValidationMessage({ errors }: AbstractControl): string {
    if (!errors) {
      return '';
    }
    if (errors.email) {
      return INVALID_EMAIL;
    }
    if (errors.required) {
      return REQUIRED;
    }
    if (errors.minlength) {
      return `Minimal length is ${errors.minlength.requiredLength}`;
    }
    if (errors.maxlength) {
      return `Maximal length is ${errors.maxlength.requiredLength}`;
    }
    return Object.values(errors)[0];
  }

  private getFieldInvalid(formControl: AbstractControl): boolean {
    return formControl.touched && formControl.status === INVALID;
  }

  isInvalid(form: FormGroup, field: string): boolean {
    return this.getFieldInvalid(this.getFormControl(form, field));
  }

  getErrorMessage(form: FormGroup, field: string): string {
    return this.getValidationMessage(this.getFormControl(form, field));
  }

  setTouched(form: FormGroup, field: string): void {
    this.getFormControl(form, field).markAllAsTouched();
  }

  getFieldStatus(form: FormGroup, field: string): FieldStatus {
    return {
      isInvalid: this.isInvalid(form, field),
      errors: this.getErrorMessage(form, field),
      setTouched: () => this.setTouched(form, field),
    };
  }
}
