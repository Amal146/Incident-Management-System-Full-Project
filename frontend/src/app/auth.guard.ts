import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NbAuthService ,NbAuthJWTToken} from '@nebular/auth';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {

    authService: NbAuthService;

    constructor(private router: Router , authService: NbAuthService) { 
      this.authService = authService;
    }

    canActivate(): boolean {
      const currentUser = localStorage.getItem('currentUser');
      
      if (currentUser) {
        // If user is logged in, allow access to pages
        return true;
      } else {
        // If user is not logged in, redirect to login
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
}