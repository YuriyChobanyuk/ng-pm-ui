import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms.service';
import { FormGroup } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { ValidationStatus } from 'src/app/interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  validationStatus!: ValidationStatus;
  fields = {
    EMAIL: 'email',
    PASSWORD: 'password',
  };

  get emailInvalid(): boolean {
    return !!this.validationStatus.get(this.fields.EMAIL)?.invalid;
  }

  get emailErrors(): string {
    return this.validationStatus.get(this.fields.EMAIL)?.error || '';
  }

  get passwordInvalid(): boolean {
    return !!this.validationStatus.get(this.fields.PASSWORD)?.invalid;
  }

  get passwordErrors(): string {
    return this.validationStatus.get(this.fields.PASSWORD)?.error || '';
  }

  ngOnInit(): void {
    this.loginForm = this.formsService.loginForm;

    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.validationStatus = this.validationService.getValidationStatus(
          this.loginForm,
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
