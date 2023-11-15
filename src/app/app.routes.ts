import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivateRoute, cantWhenAuthenticated } from './services/auth-route/auth-route.service';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AlbumComponent } from './pages/album/album.component';

export const routes: Routes = [
  {
    path: 'albums', title: 'Galeria', component: GalleryComponent, canActivate: [canActivateRoute] },
  { path: 'albums/:id', title: 'Album', component: AlbumComponent, canActivate: [canActivateRoute] },
  { path: '', title: 'Cadastro', component: RegisterComponent, canActivate: [cantWhenAuthenticated] },
  { path: 'login', title: 'Entrar', component: LoginComponent, canActivate: [cantWhenAuthenticated] },
];
