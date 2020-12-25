import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  getMinLengthMessage(errors?: ValidationErrors | null): string | null {
    return errors
      ? `Minimal length is ${errors.minlength.requiredLength}`
      : null;
  }

  getMaxLengthMessage(errors?: ValidationErrors | null): string | null {
    return errors
      ? `Maximal length is ${errors.maxlength.requiredLength}`
      : null;
  }

  getFieldInvalid(control: AbstractControl | null): boolean {
    return control
      ? (control.touched || control.dirty) && !control.valid
      : false;
  }
}
