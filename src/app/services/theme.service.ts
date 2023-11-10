import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _isDark: boolean = false;
  private _darkCssClasses: string[] = ['dark-theme', 'mat-app-background'];

  get isDark() {
    return this._isDark;
  }

  get isLight() {
    return !this._isDark;
  }

  toggle() {
    this._isDark = !this._isDark;
    for (const darkCssClass of this._darkCssClasses) document.body.classList.toggle(darkCssClass);
  }
}
