import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../../services/forms.service';
import { ValidationService } from '../../../services/validation.service';
import { FormGroup } from '@angular/forms';
import { FieldStatus, LoginFormFields } from '../../../../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formsService: FormsService,
    private validationService: ValidationService,
  ) {}

  loginForm!: FormGroup;
  fields = LoginFormFields;

  get emailStatus(): FieldStatus {
    return this.validationService.getFieldStatus(
      this.loginForm,
      this.fields.EMAIL,
    );
  }

  get passwordStatus(): FieldStatus {
    return this.validationService.getFieldStatus(
      this.loginForm,
      this.fields.PASSWORD,
    );
  }

  ngOnInit(): void {
    this.loginForm = this.formsService.getLoginForm();
  }
}
