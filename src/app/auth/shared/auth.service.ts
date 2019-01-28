import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

class DecodedToken {
  exp: number;
  username: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('app_meta')) || new DecodedToken();
  }

  private saveToken(token: string): string {

    const jwt = new JwtHelperService();
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem('jsonwebtokenrandomstring', token);
    localStorage.setItem('app_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  public register(userData: any): Observable<any> {
    return this.http.post('http://localhost:3001/api/users/register', userData);
  }

  public login(userData: any): Observable<any> {
    return this.http.post('http://localhost:3001/api/users/auth', userData)
                    .pipe(map((token: string) => this.saveToken(token)));
  }

  public logout() {
    localStorage.removeItem('jsonwebtokenrandomstring');
    localStorage.removeItem('app_meta');

    this.decodedToken = new DecodedToken();
  }

  checkPasswords(password, confirmPassword): boolean {
    return password.value !== confirmPassword.value;
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(moment.unix(this.decodedToken.exp));
  }

  public getUsername(): string {
    return this.decodedToken.email;
  }

  public getToken(): string {
    return localStorage.getItem('jsonwebtokenrandomstring');
  }
}
