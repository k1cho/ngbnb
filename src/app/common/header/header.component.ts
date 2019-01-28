import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  title: 'ngbnb';

  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();

    this.router.navigate(['login']);
  }
}
