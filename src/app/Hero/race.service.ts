import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';

import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthHttp }     from 'angular2-jwt';

import { Race }     from './class/race';
import { url_base } from '../data';

@Injectable()
export class RaceService {
    /* Variable */
    private heroesUrl = url_base + 'race/';    //'app/test.json';
    
    /* Constructor */
    constructor(private authHttp: AuthHttp) { }
    
    /* Recupere les heros */
    getRaces(): Observable<Race[]> {
        return this.authHttp.get(this.heroesUrl + 'getRaces')
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
          errMsg = err.replace(/{|}|"/g, " ");
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
