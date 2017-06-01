import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Headers, RequestOptions }  from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Hero } from './hero';
import { url_base } from '../data';

@Injectable()
export class HeroService {
    /* Variable */
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
    });
    private heroesUrl = url_base + 'hero/';    //'app/test.json';
    private options = new RequestOptions({ headers: this.headers });
    
    /* Constructor */
    constructor(private http: Http) { }
    
    /* Recupere les heros */
    getHeroes(): Observable<Hero[]> {
        return this.http.get(this.heroesUrl + 'allHeroes', this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    /* Recupere un heros */
    getHero(id: number): Observable<Hero> {
        return this.http.get(this.heroesUrl + 'getHero/' + id, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    /* Ajoute un heros */
    addHero(name: string, race: number): Observable<Hero> {
        return this.http.post(this.heroesUrl + 'addHero', {name, race}, {headers: this.headers})
          .map(this.extractData)
          .catch(this.handleError);
    }
    
    /* Supprime un heros */
    delete(id: number): Observable<Hero[]> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(this.heroesUrl + 'deleteHero/' + id, {headers: this.headers})
          .map(this.extractData)
          .catch(this.handleError);
    }
    
    /*update(hero: Hero): Observable<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
          .put(url, JSON.stringify(hero), {headers: this.headers})
          .map()
          .catch(this.handleError);
     }*/
     
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