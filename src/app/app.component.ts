import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from './services/theme.service';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ThemeService],
})

export class AppComponent {
  title = 'simplesDentalChallenge';

  constructor(private themeService: ThemeService) {}

  toggleTheme(event: MatSlideToggleChange) {
    this.themeService.toggle();
  }
}
