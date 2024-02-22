import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private authServ: AuthService
  ) {

  }
  ngOnInit(): void {
    this.authServ.user()
      .subscribe({
        next: res => {
          console.log(res)
        }
      })
  }

}
