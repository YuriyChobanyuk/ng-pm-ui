import { FormGroup } from '@angular/forms';

import { BaseField } from '../../../../shared/abstract/base-field';
import { ValidationService } from '../../../services/validation.service';

export class SignUpPasswordField extends BaseField {
  get errors(): string | null {
    const errors = this.control?.errors;
    if (!errors) {
      return null;
    }

    switch (true) {
      case !!errors.required:
        return this.validationService.getRequiredErrorMessage('Password');
      case !!errors.minlength:
        return this.validationService.getMinLengthMessage(errors);
      case !!errors.maxlength:
        return this.validationService.getMaxLengthMessage(errors);
      case !!errors.pattern:
        return this.validationService.getPasswordPatternErrorMessage();
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
