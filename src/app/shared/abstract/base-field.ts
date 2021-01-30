import { AbstractControl, FormGroup } from '@angular/forms';

import { FormField } from '../../interfaces';
import { ValidationService } from '../../shell/services/validation.service';

export abstract class BaseField implements FormField {
  get control(): AbstractControl | null {
    return this.form.get(this.fieldName);
  }

  get invalid(): boolean {
    return this.validationService.getFieldInvalid(this.control);
  }

  abstract errors: string | null;

  protected constructor(
    protected form: FormGroup,
    protected validationService: ValidationService,
    protected fieldName: string,
  ) {}
}
