import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { colorSchema } from '../../services/theme-service/theme.service';
import { BrandLogoComponent } from '../brand-logo/brand-logo.component';
import { AuthService } from '../../services/auth-service/auth-service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    BrandLogoComponent,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  providers: [AuthService]
})
export class ToolbarComponent {
  authService = inject(AuthService);

  @Input() colorSchema!: colorSchema;
  @Output() toggleThemeEmitter = new EventEmitter();
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  toggleMenu(): void {
    this.trigger.menuOpen ? this.trigger.closeMenu() : this.trigger.openMenu()
  }

  toggleTheme(): void {
    this.toggleThemeEmitter.emit();
  }

  logout(): void {
    this.authService.signOut();
  }
}
