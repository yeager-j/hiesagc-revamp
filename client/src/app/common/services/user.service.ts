import { Injectable } from '@angular/core';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../classes/user';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private url = 'http://localhost:3000/api/users/';
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authHttp: AuthHttp, private http: Http) { }

  get(id): Observable<User> {
    return this.http.get(this.url + id).map(user => this.generateUser(user.json()));
  }

  getAll(): Observable<User[]> {
    return this.http.get(this.url).map(res => {
      return res.json().map(user => this.generateUser(user.json()));
    });
  }

  getCurrent(): Observable<User> {
    let token = localStorage.getItem('hiesagc.token');

    if (token) {
      let id = this.jwtHelper.decodeToken(token);
      return this.get(id._id).map(user => this.generateUser(user));
    } else {
      return null;
    }
  }

  create(user): Observable<any> {
    return this.http.post(this.url, user).map(response => {
      return {
        user: response.json().user,
        token: response.json().token
      }
    });
  }

  update(user) {

  }

  async remove() {

  }

  private generateUser(user): User {
    return new User(
      user._id,
      user.username,
      user.name,
      user.email,
      user.rank,
      user.dues_paid,
      user.title,
      user.date_created
    );
  }
}
