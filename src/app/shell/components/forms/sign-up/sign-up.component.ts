import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormField, SignUpCredentials } from '../../../../interfaces';
import { SignUpFormService } from './sign-up-form.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @Output() toggleLogin: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  submitSignUp: EventEmitter<SignUpCredentials> = new EventEmitter<SignUpCredentials>();

  form!: FormGroup;
  email!: FormField;
  name!: FormField;
  password!: FormField;

  constructor(private formService: SignUpFormService) {}

  ngOnInit(): void {
    this.form = this.formService.createForm();
    this.email = this.formService.createEmailField(this.form);
    this.password = this.formService.createPasswordField(this.form);
    this.name = this.formService.createUsernameField(this.form);
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
