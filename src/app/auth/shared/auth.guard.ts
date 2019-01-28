import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private url: string;

  private handleAuthState(): boolean {
    if (this.isLoginOrRegister()) {
      this.router.navigate(['rentals']);

      return false;
    }

    return true;
  }

  private handleNotAuthState(): boolean {
    if (this.isLoginOrRegister()) {
      return true;
    }

    this.router.navigate(['login']);
  }

  private isLoginOrRegister(): boolean {
    if (this.url.includes('login') || this.url.includes('register')) {
      return true;
    }

    return false;
  }

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.url = state.url;

    if (this.authService.isAuthenticated()) {
      return this.handleAuthState();
    }

    return this.handleNotAuthState();

  }

}
