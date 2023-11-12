import { Injectable } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BehaviorSubject } from 'rxjs';

export type colorSchema = 'primary' | 'accent' | 'warn';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _isDark: boolean = false;
  private _darkCssClasses: string[] = ['dark-theme', 'mat-app-background'];
  private _colorSchema: BehaviorSubject<colorSchema> = new BehaviorSubject<colorSchema>('primary');

  get isDark() {
    return this._isDark;
  }

  get isLight() {
    return !this._isDark;
  }

  get colorSchema$() {
    return this._colorSchema.asObservable();
  }

  get colorSchema() {
    return this._colorSchema.value;
  }

  set colorSchema(value: colorSchema) {
    if (value !== this._colorSchema.value) this._colorSchema.next(value);
  };

  toggle() {
    this._isDark = !this._isDark;
    for (const darkCssClass of this._darkCssClasses) document.body.classList.toggle(darkCssClass);
  }
}
