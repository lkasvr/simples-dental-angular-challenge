import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ThemeService, colorSchema } from './services/theme-service/theme.service';
import { RegisterFormComponent } from './components/form-components/register/register.form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, ToolbarComponent, RegisterFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ThemeService]
})

export class AppComponent implements OnInit {
  title = 'simplesDentalChallenge';
  colorSchema!: colorSchema;

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.colorSchema$.subscribe((colorSchema: colorSchema) => this.colorSchema = colorSchema);
  }

  onToggleTheme(): void {
    this.themeService.toggle();
  }
}
