import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Headers, RequestOptions }  from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Hero } from './hero';

@Injectable()
export class HeroService {
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
    });
    private heroesUrl = 'http://localhost/combat-ubuesque/backend/web/app_dev.php/comubu-data/';    //'app/test.json';
    private options = new RequestOptions({ headers: this.headers });
    
    constructor(private http: Http) { }
    
    getHeroes(): Observable<Hero[]> {
        return this.http.get(this.heroesUrl, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    /*getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
          .map()
          .catch(this.handleError);
    }
    
    delete(id: number): Observable<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
          .map()
          .catch(this.handleError);
    }
    
    create(name: string, race: number): Observable<Hero> {
        return this.http
          .post(this.heroesUrl, JSON.stringify({name: name, race: race, state: 0, xp: 0, level: 1, life: 100}), {headers: this.headers})
          .map()
          .catch(this.handleError);
    }
    
    update(hero: Hero): Observable<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
          .put(url, JSON.stringify(hero), {headers: this.headers})
          .map()
          .catch(this.handleError);
     }*/
     
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
      }
    
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