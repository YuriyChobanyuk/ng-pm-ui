import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsService } from '../../../services/forms.service';
import { ValidationService } from '../../../services/validation.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { SignUpCredentials, SignUpFormFields } from '../../../../interfaces';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private formsService: FormsService,
    private validationService: ValidationService,
  ) {}

  @Output() toggleLogin: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  submitSignUp: EventEmitter<SignUpCredentials> = new EventEmitter<SignUpCredentials>();

  form!: FormGroup;
  fields = SignUpFormFields;

  get email(): AbstractControl | null {
    return this.form.get(this.fields.EMAIL);
  }

  get emailInvalid(): boolean {
    return this.validationService.getFieldInvalid(this.email);
  }

  get emailErrors(): string | null {
    switch (true) {
      case this.email?.errors?.required:
        return 'Email is required';
      case this.email?.errors?.email:
        return 'Should be a valid email';
      default:
        return null;
    }
  }

  get name(): AbstractControl | null {
    return this.form.get(this.fields.NAME);
  }

  get nameInvalid(): boolean {
    return this.validationService.getFieldInvalid(this.name);
  }

  get nameErrors(): string | null {
    switch (true) {
      case this.name?.errors?.required:
        return 'Name is required';
      case this.name?.errors?.minlength:
        return this.validationService.getMinLengthMessage(this.name?.errors);
      case this.name?.errors?.maxlength:
        return this.validationService.getMaxLengthMessage(this.name?.errors);
      default:
        return null;
    }
  }

  get password(): AbstractControl | null {
    return this.form.get(this.fields.PASSWORD);
  }

  get passwordInvalid(): boolean {
    return this.validationService.getFieldInvalid(this.password);
  }

  get passwordErrors(): string | null {
    switch (true) {
      case this.password?.errors?.required:
        return 'Password is required';
      case !!this.password?.errors?.minlength:
        return this.validationService.getMinLengthMessage(
          this.password?.errors,
        );
      case !!this.password?.errors?.maxlength:
        return this.validationService.getMaxLengthMessage(
          this.password?.errors,
        );
      case !!this.password?.errors?.pattern:
        return 'At least one uppercase, one lowercase, one digit and one symbol';
      default:
        return null;
    }
  }

  ngOnInit(): void {
    this.form = this.formsService.getSignUpForm();
  }

  handleToggleLogin(): void {
    this.toggleLogin.emit();
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.submitSignUp.emit(this.form.value);
    }
  }
}
