import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private translate: TranslateService) {}

  getUnknownErrorMessage(): Observable<string> {
    return this.translate.get('common.validation.unknown');
  }

  getRequiredErrorMessage(fieldName: string): Observable<string> {
    return this.translate.get(fieldName).pipe(
      switchMap((translatedFieldName: string) => {
        return this.translate.get('common.validation.required', {
          fieldName: translatedFieldName,
        });
      }),
    );
  }

  getMinLengthMessage(errors: ValidationErrors): Observable<string> {
    const requiredLength = this.getRequiredLength(errors, 'minlength');

    return this.translate.get('common.validation.minLength', {
      requiredLength,
    });
  }

  getMaxLengthMessage(errors: ValidationErrors): Observable<string> {
    const requiredLength = this.getRequiredLength(errors, 'minlength');

    return this.translate.get('common.validation.maxLength', {
      requiredLength,
    });
  }

  getFieldInvalid(control: AbstractControl | null): boolean {
    return control
      ? (control.touched || control.dirty) && !control.valid
      : false;
  }

  getInvalidEmailErrorMessage(): Observable<string> {
    return this.translate.get('common.validation.email');
  }

  getPasswordPatternErrorMessage(): Observable<string> {
    return this.translate.get('common.validation.userPasswordPattern');
  }

  private getRequiredLength(
    errors: ValidationErrors,
    key: 'minlength' | 'maxlength',
  ): number {
    return errors[key]?.requiredLength as number;
  }
}
