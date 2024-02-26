import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieServ = inject(CookieService);
  const authServ = inject(AuthService);
  const router = inject(Router);
  const user = authServ.getUser();

  let token = cookieServ.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer', '');
    const decodedToken: any = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      // logout
      authServ.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
    } else {
      // token is still valid
      if (user.roles.includes('Writer')) {
        return true;
      } else {
        alert('Unauthorized');
        return false;
      }
    }
  } else {
    // logout
    authServ.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
  }
};
