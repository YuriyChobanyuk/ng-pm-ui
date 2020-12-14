import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private formsService: FormsService) {}
  loginForm!: FormGroup;
  get emailInvalid(): boolean {
    return this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.status === 'INVALID';
  }

  ngOnInit(): void {
    this.loginForm = this.formsService.loginForm;

    this.loginForm.valueChanges.subscribe((values) => {
      console.log(this.loginForm);
    });
  }
}
