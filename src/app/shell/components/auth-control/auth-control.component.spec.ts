import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthControlComponent } from './auth-control.component';
import { userStub } from '../../../shared/helpers/stubs';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { DEFAULT_AVATAR_PATH, locations } from '../../../shared/constants';
import { IUser } from 'src/app/interfaces';
import { RouterLinkStubDirective } from '../../../shared/directives/stubs/router-link-stub.directive';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthControlComponent', () => {
  let component: AuthControlComponent;
  let fixture: ComponentFixture<AuthControlComponent>;
  let host: HTMLElement;

  const setInput = (input: {
    user?: IUser | null;
    isAuthPage?: boolean;
    userLoading?: boolean;
  }) => {
    component.isAuthPage = input.isAuthPage ?? false;
    component.user = input.user ? { ...input.user } : null;
    component.userLoading = input.userLoading ?? false;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModule],
      declarations: [AuthControlComponent, RouterLinkStubDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthControlComponent);
    component = fixture.componentInstance;
    host = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should render auth control when user is not loading', () => {
    setInput({ user: userStub });
    fixture.detectChanges();

    const authControl = host.querySelector('.auth-control');

    expect(authControl).toBeTruthy();
  });

  it('should render spinner when loading', () => {
    setInput({ userLoading: true });
    fixture.detectChanges();

    const spinnerContainer = host.querySelector<HTMLElement>(
      '.auth-control-spinner',
    );
    const spinner = host.querySelector<HTMLElement>('[role="status"]');

    expect(spinnerContainer?.innerText).toBe('Loading...');
    expect(spinner).toBeTruthy();
  });

  it('avatar click should trigger #toggle', () => {
    setInput({ user: userStub });
    fixture.detectChanges();

    const avatar = host.querySelector('.avatar-img');
    const dropdownHost = fixture.debugElement.query(By.directive(NgbDropdown));
    const userMenuDrop = dropdownHost.injector.get(NgbDropdown);
    const toggleSpy = spyOn(userMenuDrop, 'toggle');

    avatar?.dispatchEvent(new Event('click'));
    const enterPress = new KeyboardEvent('keydown', {
      key: 'Enter',
    });
    avatar?.dispatchEvent(enterPress);

    expect(toggleSpy).toHaveBeenCalledTimes(2);
  });

  it('avatar should receive valid image source', () => {
    setInput({ user: userStub });
    fixture.detectChanges();

    const avatar = host.querySelector<HTMLImageElement>('.avatar-img');

    expect(avatar?.src?.endsWith(DEFAULT_AVATAR_PATH)).toBeTrue();

    const updatedPath = 'updated_path';
    component.user = { ...userStub, img_path: updatedPath };
    fixture.detectChanges();

    expect(avatar?.src?.endsWith(updatedPath)).toBeTrue();
  });

  describe('login link', () => {
    it('should be shown', () => {
      setInput({});
      fixture.detectChanges();

      const loginLink = host.querySelector<HTMLLinkElement>(
        '[aria-label="login link"]',
      );

      expect(loginLink?.textContent).toBe('Login');
    });

    it('should be hidden on auth page or when authenticated', () => {
      setInput({ isAuthPage: true });
      fixture.detectChanges();

      const loginLink = host.querySelector<HTMLLinkElement>(
        '[aria-label="login link"]',
      );

      expect(loginLink).toBeFalsy();
      setInput({ user: userStub });
      fixture.detectChanges();

      expect(loginLink).toBeFalsy();
    });

    it('should navigate on click', () => {
      setInput({});
      fixture.detectChanges();

      const loginLink = fixture.debugElement.query(
        By.directive(RouterLinkStubDirective),
      );
      const routerLinkStub = loginLink.injector.get(RouterLinkStubDirective);

      expect(routerLinkStub.linkParams).toBe(locations.AUTH);
      expect(routerLinkStub.navigatedTo).toBeNull();

      loginLink.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(routerLinkStub.navigatedTo).toBe(locations.AUTH);
    });
  });
});
