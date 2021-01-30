import { FormGroup } from '@angular/forms';

import { BaseField } from '../../../../shared/abstract/base-field';
import { ValidationService } from '../../../services/validation.service';

export class UsernameField extends BaseField {
  get errors(): string | null {
    const errors = this.control?.errors;
    if (!errors) {
      return null;
    }

    switch (true) {
      case !!errors.required:
        return this.validationService.getRequiredErrorMessage('Name');
      case !!errors.minlength:
        return this.validationService.getMinLengthMessage(errors);
      case !!errors.maxlength:
        return this.validationService.getMaxLengthMessage(errors);
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
