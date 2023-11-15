import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivateRoute, cantWhenAuthenticated } from './services/auth-route/auth-route.service';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AlbumComponent } from './pages/album/album.component';

export const routes: Routes = [
  {
    path: 'albums',
    component: GalleryComponent,
  },
  { path: 'albums/:id', component: AlbumComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [cantWhenAuthenticated] },
];
