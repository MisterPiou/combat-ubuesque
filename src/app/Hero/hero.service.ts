import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';

import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthHttp }     from 'angular2-jwt';

import { Hero }     from './class/hero';
import { url_base } from '../data';

@Injectable()
export class HeroService {
    heroesUrl = url_base + 'hero/';    //'app/test.json';
    heroInfo: Hero;
    
    constructor(private authHttp: AuthHttp) { }
    
    getHeroes(): Observable<Hero[]> {
        return this.authHttp.get(this.heroesUrl + 'getHeroes')
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    getHero(id: number): Observable<Hero> {
        return this.authHttp.get(this.heroesUrl + 'getHero/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    getHeroSelected(): Observable<Hero> {
        return this.authHttp.get(this.heroesUrl + 'getHeroSelected')
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    addHero(name: string, race: number): Observable<Hero> {
        return this.authHttp.post(this.heroesUrl + 'addHero', {name, race})
          .map(this.extractData)
          .catch(this.handleError);
    }
    
    delete(id: number): Observable<Hero[]> {
        return this.authHttp.get(this.heroesUrl + 'deleteHero/' + id)
          .map(this.extractData)
          .catch(this.handleError);
    }
    
    updateHero(id: number, data: any): Observable<Hero> {
        return this.authHttp.post(this.heroesUrl + 'updateHero/' + id, data)
          .map(this.extractData)
          .catch(this.handleError);
     }
     
    /* Extract data json */
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
      }
    
    /* Manage errores response */
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
    
    /* Accessor Hero */
    public getHeroInfo() {
        return this.heroInfo;
    }
    public setHeroInfo(heroInfo: Hero) {
        this.heroInfo = heroInfo;
    }
}