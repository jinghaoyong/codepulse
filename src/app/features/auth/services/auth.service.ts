import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user, UserCredential } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);
  private provider = new GoogleAuthProvider();

  constructor(
    private http: HttpClient,
    private cookieServ: CookieService,
    private afAuth: AngularFireAuth
  ) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    });
  }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      const user: User = {
        email: email,
        roles: roles?.split(',')
      }
      return user
    }
    return undefined;

  }
  logout(): void {
    localStorage.clear();
    this.cookieServ.delete('Authorization', '/');
    this.$user.next(undefined);
  }

  googleLogin() {
    this.afAuth.signInWithPopup(this.provider)
      .then((result: any) => { // Adjust the type here
        // the result is good enuf to use 

        console.log("result here", result)
        const formattedResult: UserCredential = {
          user: result?.user,
          providerId: result?.additionalUserInfo?.providerId,
          operationType: result?.operationType
        }
        console.log("formattedResult", formattedResult)
        const credential = GoogleAuthProvider.credentialFromResult(formattedResult);
        // // Do something with credential if needed
        // console.log("i want to see credential here", credential)
      }).catch((error) => {
        // Handle errors
        console.log('Google login error:', error);
      });
  }


  googleLogout() {
    this.afAuth.signOut()
      .then(() => {
        console.log('Signed out successfully');
      }).catch((error) => {
        console.log('Sign out error:', error);
      });
  }
}
