import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Theme } from './theme.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _theme = new BehaviorSubject<Theme>(this.currentTheme());

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.setThemeBody();
  }

  get theme(): Theme {
    return this._theme.value;
  }

  set theme(theme: Theme) {
    this.removeThemeBody();

    const json = JSON.stringify(theme);
    localStorage.setItem("theme", json);
    this._theme.next(theme);

    this.setThemeBody();
  }

  toggleTheme(theme: Theme): void {
    this.theme = theme;
  }

  isDark(): boolean {
    return this.theme.title === 'dark';
  }

  private currentTheme(): Theme {
    const json  = localStorage.getItem("theme");
    const theme = json ? JSON.parse(json) : { title: "light" };

    return theme;
  }

  private setThemeBody() {
    this.document.body.classList.add(this.theme.title);
  }

  private removeThemeBody() {
    this.document.body.classList.remove(this.theme.title);
  }
}
