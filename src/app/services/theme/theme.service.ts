import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ThemeTitle, typesTheme } from './theme.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _theme = new BehaviorSubject<ThemeTitle>(this.currentTheme());

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.setThemeBody();
  }

  get theme(): ThemeTitle {
    return this._theme.value;
  }

  set theme(theme: ThemeTitle) {
    this.removeThemeBody();

    localStorage.setItem("NG@Theme", theme);
    this._theme.next(theme);

    this.setThemeBody();
  }

  toggleTheme(theme: ThemeTitle): void {
    this.theme = theme;
  }
  
  private currentTheme(): ThemeTitle {
    const item  = localStorage.getItem("NG@Theme") ?? '';
    const theme = typesTheme.find( current => current == item);

    return theme ?? "light";
  }

  private setThemeBody() {
    this.document.body.classList.add(this.theme);
  }

  private removeThemeBody() {
    this.document.body.classList.remove(this.theme);
  }
}
