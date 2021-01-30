import { AbstractControl } from '@angular/forms';

export interface FormField {
  control: AbstractControl | null;
  invalid: boolean;
  errors: string | null;
}
