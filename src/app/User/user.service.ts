import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Headers, RequestOptions }  from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { url_base } from '../Data';

@Injectable()
export class UserService {
    /* Variables */
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
    });
    private userUrl = url_base + 'user/';    //'app/test.json';
    private options = new RequestOptions({ headers: this.headers });
    
    /* Constructeur */
    constructor(private http: Http) { }
    
    /* Enregistre un nouvelle utilisateur */
    registerUser(data: any): Observable<string> {
        return this.http.post(this.userUrl + 'register', data, {headers: this.headers})
          .map(this.extractData)
          .catch(this.handleError);
    }
    
    /* Extracte les donnees json */
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
      }
    
    /* Gere les erreurs de reponse */
    private handleError(error: any): Observable<any> {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}