import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginFormFields } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private fb: FormBuilder) {}

  getLoginForm(): FormGroup {
    return this.fb.group({
      [LoginFormFields.EMAIL]: ['', [Validators.required, Validators.email]],
      [LoginFormFields.PASSWORD]: ['', Validators.required],
    });
  }
}
