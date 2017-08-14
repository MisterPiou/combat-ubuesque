import { Injectable }                       from '@angular/core';
import { Http, Response, URLSearchParams }  from '@angular/http';
import { Headers, RequestOptions }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { tokenNotExpired }  from 'angular2-jwt';
import { AuthHttp }         from 'angular2-jwt';

import { url_base } from '../data';

export class User {
    constructor(
        public id: number,
        public username: string,
        public state: number,
        public last_login: Date
    ){}
}

@Injectable()
export class UserService {
    headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
    });
    userUrl = url_base + 'user/';    //'app/test.json';
    options = new RequestOptions({ headers: this.headers });
    user: User = null;
    
    constructor(private http: Http, private authHttp: AuthHttp) { }
    
    registerUser(data: any): Observable<string> {
        return this.http.post(this.userUrl + 'register', data, {headers: this.headers})
          .map(this.extractData)
          .catch(this.handleError);
    }
    
    loginUser(data: any) {
        let body     = new URLSearchParams();
        body.append('username', data.username);
        body.append('password', data.password);
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.userUrl + 'login_check', body, options)
          .map(this.extractData)
          .catch(this.handleError);
    }
    
    infosUser() {
        return this.authHttp.get(this.userUrl + 'infosUser')
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
      }
    
    private handleError(error: any): Observable<any> {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = err.replace(/{|}|"/g, " ");
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    
    /* Acceso User */
    public getUser() {
        return this.user;
    }
    public setUser(user: User) {
        this.user = user;
    }
    
    logout() {
      localStorage.removeItem('token');
    }

    loggedIn() {
      return tokenNotExpired();
    }
}