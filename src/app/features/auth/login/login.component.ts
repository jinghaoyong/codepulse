import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm!: UntypedFormGroup;
  submitted = false;
  error = '';
  returnUrl?: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authServ: AuthService,
    private cookieServ: CookieService,
    // private authenticationService: AuthenticationService,
    // private authFackservice: AuthfakeauthenticationService
  ) {
  }


  ngOnInit() {
    document.body.setAttribute('class', 'authentication-bg');

    this.loginForm = this.formBuilder.group({
      email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    document.body.classList.remove('authentication-bg')
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm?.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm?.invalid) {
    //   return;
    // } else {
    //   if (environment?.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
    //       document.body.removeAttribute('class');
    //       this.router.navigate(['/']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f.email.value, this.f.password.value)
    //       .pipe(first())
    //       .subscribe(
    //         data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }

  onFormSubmit(): void {
    console.log(this.loginForm.getRawValue())
    const data: LoginRequest = {
      email: this.loginForm.getRawValue().email,
      password: this.loginForm.getRawValue().password
    }
    console.log("data", data)
    this.authServ.login(data)
      .subscribe({
        next: res => {
          console.log(res)
          //set auth cookie
          this.cookieServ.set('Authorization', `Bearer ${res.token}`,
            undefined, '/', undefined, true, 'Strict');

          // set user 
          // this.authServ.setUser({
          //   email: res.email,
          //   name: res.roles
          // })

          //redirect back to home
          this.router.navigateByUrl('/');
        }
      })
  }

  loginWithGoogle() {
    this.authServ.googleLogin();
  }
}
// {

//   model: LoginRequest;

//   constructor(
//     private authServ: AuthService,
//     private cookieServ: CookieService,
//     private router: Router
//   ) {
//     this.model = {
//       email: '',
//       password: ''
//     }
//   }



// }
