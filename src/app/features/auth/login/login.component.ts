import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest;

  constructor(
    private authServ: AuthService,
    private cookieServ: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit(): void {
    console.log(this.model)
    this.authServ.login(this.model)
      .subscribe({
        next: res => {
          console.log(res)
          //set auth cookie
          this.cookieServ.set('Authorization', `Bearer ${res.token}`,
            undefined, '/', undefined, true, 'Strict');

          // set user 
          this.authServ.setUser({
            email: res.email,
            roles: res.roles
          })

          //redirect back to home
          this.router.navigateByUrl('/');
        }
      })
  }

}
