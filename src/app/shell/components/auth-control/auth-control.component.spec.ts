import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthControlComponent } from './auth-control.component';
import { userStub } from '../../../shared/helpers/stubs';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DEFAULT_AVATAR_PATH, locations } from '../../../shared/constants';
import { RouterLinkStubDirective } from '../../../shared/directives/stubs/router-link-stub.directive';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthControlPage } from './utils';

describe('AuthControlComponent', () => {
  let component: AuthControlComponent;
  let fixture: ComponentFixture<AuthControlComponent>;
  let page: AuthControlPage<AuthControlComponent>;

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
    page = new AuthControlPage<AuthControlComponent>(fixture);

    fixture.detectChanges();
  });

  it('should render auth control when user is not loading', () => {
    page.setInput({ user: userStub });
    fixture.detectChanges();

    const authControl = page.queryEl('.auth-control');

    expect(authControl).toBeTruthy();
  });

  it('should render spinner when loading', () => {
    page.setInput({ userLoading: true });
    fixture.detectChanges();

    const spinnerContainer = page.queryEl('.auth-control-spinner');
    const spinner = page.queryEl('[role="status"]');

    expect(spinnerContainer?.innerText).toBe('Loading...');
    expect(spinner).toBeTruthy();
  });

  it('avatar click should trigger #toggle', () => {
    page.setInput({ user: userStub });
    fixture.detectChanges();

    const avatar = page.queryEl('.avatar-img');
    const [userMenuDrop] = page.directive(NgbDropdown);
    const toggleSpy = spyOn(userMenuDrop, 'toggle');

    avatar?.dispatchEvent(new Event('click'));
    const enterPress = new KeyboardEvent('keydown', {
      key: 'Enter',
    });
    avatar?.dispatchEvent(enterPress);

    expect(toggleSpy).toHaveBeenCalledTimes(2);
  });

  it('avatar should receive valid image source', () => {
    page.setInput({ user: userStub });
    fixture.detectChanges();

    const avatar = page.queryEl<HTMLImageElement>('.avatar-img');

    expect(avatar?.src?.endsWith(DEFAULT_AVATAR_PATH)).toBeTrue();

    const updatedPath = 'updated_path';
    component.user = { ...userStub, img_path: updatedPath };
    fixture.detectChanges();

    expect(avatar?.src?.endsWith(updatedPath)).toBeTrue();
  });

  describe('login link', () => {
    it('should be shown', () => {
      page.setInput({});
      fixture.detectChanges();

      const loginLink = page.queryEl<HTMLLinkElement>('[title="Login"]');

      expect(loginLink?.textContent).toBe('Login');
    });

    it('should be hidden on auth page or when authenticated', () => {
      page.setInput({ isAuthPage: true });
      fixture.detectChanges();

      const loginLink = page.queryEl<HTMLLinkElement>('[title="Login"]');

      expect(loginLink).toBeFalsy();
      page.setInput({ user: userStub });
      fixture.detectChanges();

      expect(loginLink).toBeFalsy();
    });

    it('should navigate on click', () => {
      page.setInput({});
      fixture.detectChanges();

      const [routerLinkStub, loginLink] = page.directive(
        RouterLinkStubDirective,
      );

      expect(routerLinkStub.linkParams).toBe(locations.AUTH);
      expect(routerLinkStub.navigatedTo).toBeNull();

      loginLink.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(routerLinkStub.navigatedTo).toBe(locations.AUTH);
    });
  });

  it('should emit (logout) on user menu (click)', () => {
    page.setInput({ user: userStub });
    fixture.detectChanges();

    const logoutSpy = spyOn(component.logout, 'emit');
    const logoutButton = page.button('logout');
    logoutButton?.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    expect(logoutSpy).toHaveBeenCalled();
  });
});
