import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsService } from '../../services/forms.service';
import { FormGroup } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(
    private formsService: FormsService,
    private validationService: ValidationService,
  ) {}
  destroy$ = new Subject();

  loginForm!: FormGroup;
  fields = {
    EMAIL: 'email',
    PASSWORD: 'password',
  };

  getIsInvalid(fieldName: string): boolean {
    return this.validationService.getFieldInvalid(
      this.loginForm.controls[fieldName],
    );
  }

  getErrorMessage(fieldName: string): string {
    return this.validationService.getValidationMessage(
      this.loginForm.controls[fieldName]?.errors,
    );
  }

  ngOnInit(): void {
    this.loginForm = this.formsService.loginForm;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  handleBlur(fieldName: string): void {
    this.loginForm.controls[fieldName].markAsTouched();
  }
}
