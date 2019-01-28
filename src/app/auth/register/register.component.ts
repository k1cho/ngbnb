import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidator } from './password.validator';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
  formData: any = {};
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.formData = {};
    this.error = '';
  }

  register() {
    this.authService.register(this.formData).subscribe(
      () => {
        this.router.navigate(['/login', {registered: 'success'}]);
      },
      (errors) => {
        // this.error = errors.error.message;
        console.log(errors);
      }
    );
  }

  checkPasswords(pw, cpw): boolean {
    return this.authService.checkPasswords(pw, cpw);
  }
}
