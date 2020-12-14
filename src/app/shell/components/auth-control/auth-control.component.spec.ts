import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthControlComponent } from './auth-control.component';

describe('AuthControlComponent', () => {
  let component: AuthControlComponent;
  let fixture: ComponentFixture<AuthControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
