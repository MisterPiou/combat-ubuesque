import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private heroesUrl = 'backend/web/app_dev.php/comubu-data/';
    
    constructor(private http: Http) { }
    
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }
    
    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as Hero)
          .catch(this.handleError);
    }
    
    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }
    
    create(name: string, race: number): Promise<Hero> {
        return this.http
          .post(this.heroesUrl, JSON.stringify({name: name, race: race, state: 0, xp: 0, level: 1, life: 100}), {headers: this.headers})
          .toPromise()
          .then(res => res.json().data as Hero)
          .catch(this.handleError);
    }
    
    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
          .put(url, JSON.stringify(hero), {headers: this.headers})
          .toPromise()
          .then(() => hero)
          .catch(this.handleError);
     }
    
    private handleError(error: any): Promise<any> {
        console.error('Une erreur à été rencontrée', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}