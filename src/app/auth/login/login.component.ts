import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData: any = {};
  error = '';

  notifyMessage: string = null;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.formData = {};
    this.error = '';

    this.route.params.subscribe((params) => {
      if (params['registered'] === 'success') {
        return this.notifyMessage = 'Successfully registered, please Log In.';
      }
    });
  }

  login() {
    this.authService.login(this.formData).subscribe(
      (token) => {
        this.router.navigate(['rentals', {loggedin: 'success'}]);
      },
      (errors) => {
        this.error = errors.error.message;
      }
    );
  }

}
