import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PASSWORD_REG_EXP } from 'src/app/common/constants';
import { ValidationService } from './validation.service';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
  ) {}

  loginForm = this.fb.group({
    email: [
      '',
      [this.validationService.required, this.validationService.email],
    ],
    password: ['', this.validationService.required],
  });
}
