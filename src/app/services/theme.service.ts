import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _theme = new BehaviorSubject<string>(this.currentTheme());

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.setThemeBody();
  }

  get theme(): string {
    return this._theme.value;
  }

  set theme(theme: string) {
    this.removeThemeBody();

    localStorage.setItem("theme", theme);
    this._theme.next(theme);

    this.setThemeBody();
  }

  toggleTheme(): void {
    this.theme = this.isDark() ? 'light' : 'dark';
  }

  isDark(): boolean {
    return this.theme === 'dark';
  }

  private currentTheme(): string {
    return localStorage.getItem("theme") ?? "light";
  }

  private setThemeBody() {
    this.document.body.classList.add(this.theme);
  }

  private removeThemeBody() {
    this.document.body.classList.remove(this.theme);
  }
}
