import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginFormFields } from '../../interfaces';
import { FormsService } from './forms.service';

describe('FormsService', () => {
  let service: FormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [],
    });
    service = TestBed.inject(FormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create login form with valid names', () => {
    const form = service.getLoginForm();
    const fields = Object.keys(form.controls);
    const requiredFields = Object.values(LoginFormFields);

    expect(fields).toEqual(requiredFields);
  });
});
