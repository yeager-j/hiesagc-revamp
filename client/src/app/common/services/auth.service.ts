import { Injectable } from '@angular/core';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {
  private url = 'http://localhost:3000/api/users/';

  constructor(private authHttp: AuthHttp, private http: Http) { }

  loggedIn() {
    return tokenNotExpired('hiesagc.token');
  }

  login(creds) {
    return this.http.post(this.url + 'login', creds)
  }

  logout() {
    localStorage.removeItem('hiesagc.token');
  }
}
