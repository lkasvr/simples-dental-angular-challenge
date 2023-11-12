import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { ThemeService, colorSchema } from './services/theme.service';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, MatSlideToggleModule, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ThemeService],
})

export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  title = 'simplesDentalChallenge';
  colorSchema: colorSchema = this.themeService.colorSchema;

  ngOnInit(): void {
    this.themeService.colorSchema$.subscribe((colorSchema: colorSchema) => this.colorSchema = colorSchema);
  }

  toggleTheme(event: MatSlideToggleChange) {
    this.themeService.toggle();
  }
}
