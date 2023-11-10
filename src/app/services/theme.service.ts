import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _isDark: boolean = false;
  private _darkCssClasses: string[] = ['dark-theme', 'mat-app-background'];
  private _lightCssClasses: string[] = ['light-theme'];

  get isDark() {
    return this._isDark;
  }

  get isLight() {
    return !this._isDark;
  }

  toggle() {
    this._isDark = !this._isDark;
    if (this.isDark) {
      document.body.classList.remove(...this._lightCssClasses);
      document.body.classList.add(...this._darkCssClasses);
    } else {
      document.body.classList.add(...this._lightCssClasses);
      document.body.classList.remove(...this._darkCssClasses);
    }
  }
}
