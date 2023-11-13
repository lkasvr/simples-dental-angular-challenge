import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth-service/auth-service";

@Injectable()
export class AuthRouteService {
  private authService = inject(AuthService);

  constructor(private router: Router) {}

  canActivate(): boolean {
    return this.authService.isAuthenticated();
  }

  cantWhenAuthenticated(): boolean {
    return !this.authService.isAuthenticated();
  }
}

export const canActivateRoute: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthRouteService).canActivate();
export const cantWhenAuthenticated: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthRouteService).cantWhenAuthenticated();
