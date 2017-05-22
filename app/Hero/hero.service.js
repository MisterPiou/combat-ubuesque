"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.headers = new http_2.Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
        });
        this.heroesUrl = 'http://localhost/combat-ubuesque/backend/web/app_dev.php/comubu-data/'; //'app/test.json';
        this.options = new http_2.RequestOptions({ headers: this.headers });
    }
    HeroService.prototype.getHeroes = function () {
        return this.http.get(this.heroesUrl, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
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
    HeroService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    HeroService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return HeroService;
}());
HeroService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HeroService);
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map