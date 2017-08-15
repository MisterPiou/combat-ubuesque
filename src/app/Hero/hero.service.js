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
    function HeroService(authHttp) {
        this.authHttp = authHttp;
        this.heroesUrl = data_1.url_base + 'hero/'; //'app/test.json';
    }
    HeroService.prototype.getHeroes = function () {
        return this.authHttp.get(this.heroesUrl + 'getHeroes')
            .map(this.extractData)
            .catch(this.handleError);
    };
    HeroService.prototype.getHero = function (id) {
        return this.authHttp.get(this.heroesUrl + 'getHero/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    HeroService.prototype.getHeroSelected = function () {
        return this.authHttp.get(this.heroesUrl + 'getHeroSelected')
            .map(this.extractData)
            .catch(this.handleError);
    };
    HeroService.prototype.addHero = function (name, race) {
        return this.authHttp.post(this.heroesUrl + 'addHero', { name: name, race: race })
            .map(this.extractData)
            .catch(this.handleError);
    };
    HeroService.prototype.delete = function (id) {
        return this.authHttp.get(this.heroesUrl + 'deleteHero/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    HeroService.prototype.updateHero = function (id, data) {
        return this.authHttp.post(this.heroesUrl + 'updateHero/' + id, data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /* Extract data json */
    HeroService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    /* Manage errores response */
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
    /* Accessor Hero */
    HeroService.prototype.getHeroInfo = function () {
        return this.heroInfo;
    };
    HeroService.prototype.setHeroInfo = function (heroInfo) {
        this.heroInfo = heroInfo;
    };
    return HeroService;
}());
HeroService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [angular2_jwt_1.AuthHttp])
], HeroService);
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map