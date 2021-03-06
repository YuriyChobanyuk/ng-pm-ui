import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class BasePage<T> {
  private component: T;

  constructor(protected fixture: ComponentFixture<T>) {
    this.component = this.fixture.componentInstance;
  }

  queryEl<E = HTMLElement>(selector: string): E | undefined {
    return this.queryDe(selector)?.nativeElement;
  }

  queryDe(selector?: string): DebugElement | null {
    return selector
      ? this.fixture.debugElement.query(By.css(selector))
      : this.fixture.debugElement;
  }

  queryDeAll(selector: string): DebugElement[] {
    return this.fixture.debugElement.queryAll(By.css(selector));
  }

  queryElAll<E = HTMLElement>(selector: string): E[] | [] {
    return this.queryDeAll(selector).map((db) => {
      return db.nativeElement;
    });
  }

  button(
    name: string,
    extraSelectors: string = '',
  ): HTMLButtonElement | undefined {
    const selector = `button[name="${name}"]${extraSelectors}`;
    return this.queryEl<HTMLButtonElement>(selector);
  }

  input(id: string, extraSelectors: string = ''): HTMLInputElement | undefined {
    const selector = `input#${id}${extraSelectors}`;
    return this.queryEl<HTMLInputElement>(selector);
  }

  directive<D, E = HTMLElement>(DirectiveClass: Type<D>): [D, E, DebugElement] {
    const de = this.fixture.debugElement.query(By.directive(DirectiveClass));
    const dir = de.injector.get(DirectiveClass);
    const el = de.nativeElement;
    return [dir, el, de];
  }
}
