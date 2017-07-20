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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var angular2_jwt_1 = require("angular2-jwt");
var data_1 = require("../data");
var HeroService = (function () {
    /* Constructor */
    function HeroService(authHttp) {
        this.authHttp = authHttp;
        /* Variable */
        this.heroesUrl = data_1.url_base + 'hero/'; //'app/test.json';
    }
    /* Recupere les heros */
    HeroService.prototype.getHeroes = function () {
        return this.authHttp.get(this.heroesUrl + 'getHeroes')
            .map(this.extractData)
            .catch(this.handleError);
    };
    /* Recupere un heros */
    HeroService.prototype.getHero = function (id) {
        return this.authHttp.get(this.heroesUrl + 'getHero/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /* Ajoute un heros */
    HeroService.prototype.addHero = function (name, race) {
        return this.authHttp.post(this.heroesUrl + 'addHero', { name: name, race: race })
            .map(this.extractData)
            .catch(this.handleError);
    };
    /* Supprime un heros */
    HeroService.prototype.delete = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.authHttp.get(this.heroesUrl + 'deleteHero/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /*update(hero: Hero): Observable<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
          .put(url, JSON.stringify(hero), {headers: this.headers})
          .map()
          .catch(this.handleError);
     }*/
    /* Extracte les donnees json */
    HeroService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    /* Gere les erreurs de reponse */
    HeroService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = err.replace(/{|}|"/g, " ");
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    return HeroService;
}());
HeroService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [angular2_jwt_1.AuthHttp])
], HeroService);
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map