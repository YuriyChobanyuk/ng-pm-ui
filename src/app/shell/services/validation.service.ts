import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  getUnknownErrorMessage(): string {
    return 'Unknown error';
  }

  getRequiredErrorMessage(fieldName: string): string {
    return `${fieldName} is required`;
  }

  getMinLengthMessage(errors: ValidationErrors): string {
    const requiredLength = this.getRequiredLength(errors, 'minlength');
    return `Minimal length is ${requiredLength}`;
  }

  getMaxLengthMessage(errors: ValidationErrors): string {
    const requiredLength = this.getRequiredLength(errors, 'minlength');
    return `Maximal length is ${requiredLength}`;
  }

  getFieldInvalid(control: AbstractControl | null): boolean {
    return control
      ? (control.touched || control.dirty) && !control.valid
      : false;
  }

  getInvalidEmailErrorMessage(): string {
    return 'Should be a valid email';
  }

  getPasswordPatternErrorMessage(): string {
    return 'At least one uppercase, one lowercase, one digit and one symbol';
  }

  private getRequiredLength(
    errors: ValidationErrors,
    key: 'minlength' | 'maxlength',
  ): number {
    return errors[key]?.requiredLength as number;
  }
}
