import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  lastScrollPosition = 0;
  showNavbar?: boolean = true;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.showNavbar = currentScrollPosition < this.lastScrollPosition;
    this.lastScrollPosition = currentScrollPosition <= 0 ? 0 : currentScrollPosition;
  }

  user?: User;
  constructor(
    private authServ: AuthService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.authServ.user()
      .subscribe({
        next: res => {
          console.log(res)
          this.user = res;
        }
      });

    this.user = this.authServ.getUser();

  }

  onLogout(): void {
    // this.authServ.logout();
    // this.router.navigateByUrl('/')
    this.authServ.googleLogout();
  }

}
