import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _theme = new BehaviorSubject<string>(this.currentTheme());

  constructor() { }

  currentTheme(): string {
    return localStorage.getItem("theme") ?? "light";
  }

  toggleTheme(): void {
    console.log('a');
    this.theme = this.isDark() ? 'light' : 'dark';
  }

  isDark(): boolean {
    return this.theme === 'dark';
  }

  get theme(): string {
    return this._theme.value;
  }

  set theme(theme: string) {
    localStorage.setItem("theme", theme);
    this._theme.next(theme);
  }
}
