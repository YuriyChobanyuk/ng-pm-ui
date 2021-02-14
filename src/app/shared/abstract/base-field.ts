import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { FormField } from '../../interfaces';
import { ValidationService } from '../../shell/services/validation.service';

export abstract class BaseField implements FormField {
  control: AbstractControl | null;
  controlName: string;

  get invalid(): boolean {
    return this.control
      ? (this.control.touched || this.control.dirty) && !this.control.valid
      : false;
  }

  abstract errors: Observable<string> | null;

  protected constructor(
    protected form: FormGroup,
    protected validationService: ValidationService,
    protected fieldName: string,
  ) {
    this.control = this.form.get(this.fieldName);
    this.controlName = this.fieldName;
  }
}
