import { FormGroup } from '@angular/forms';

import { BaseField } from '../../../../shared/abstract/base-field';
import { ValidationService } from '../../../services/validation.service';

export class EmailField extends BaseField {
  get errors(): string | null {
    const errors = this.control?.errors;
    if (!errors) {
      return null;
    }

    switch (true) {
      case !!errors.reqired:
        return this.validationService.getRequiredErrorMessage('Email');
      case !!errors.email:
        return this.validationService.getInvalidEmailErrorMessage();
      default:
        return this.validationService.getUnknownErrorMessage();
    }
  }

  constructor(
    form: FormGroup,
    validationService: ValidationService,
    fieldName: string,
  ) {
    super(form, validationService, fieldName);
  }
}
