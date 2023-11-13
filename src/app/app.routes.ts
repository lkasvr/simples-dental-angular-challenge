import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivateRoute, cantWhenAuthenticated } from './services/auth-route/auth-route.service';
import { GalleryComponent } from './pages/gallery/gallery.component';

export const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'register', component: RegisterComponent, canActivate: [canActivateRoute] },
  { path: 'login', component: LoginComponent, canActivate: [cantWhenAuthenticated] },
];
