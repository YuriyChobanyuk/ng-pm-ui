import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

export interface FormField {
  control: AbstractControl | null;
  invalid: boolean;
  errors: Observable<string> | null;
  controlName: string;
}
