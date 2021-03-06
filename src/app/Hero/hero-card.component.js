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
var router_1 = require("@angular/router");
require("rxjs/add/operator/switchMap");
var hero_1 = require("./class/hero");
var hero_service_1 = require("./hero.service");
var error_service_1 = require("../Global/error.service");
var formula_service_1 = require("../Global/formula.service");
var HeroCardComponent = (function () {
    function HeroCardComponent(heroService, errorService, route, router, formula) {
        this.heroService = heroService;
        this.errorService = errorService;
        this.route = route;
        this.router = router;
        this.formula = formula;
        this.hero = new hero_1.Hero(1, 1, "", null, 0, 0, 1, 100);
        this.lifePercentage = 0;
        this.races = null;
        this.xpPercentage = 0;
        this.isLoading = false;
    }
    HeroCardComponent.prototype.initCard = function () {
        this.xpPercentage = Math.round((this.hero.xp / this.formula.calculateXpNeed(this.hero.level)) * 100);
        this.lifePercentage = Math.round((this.hero.life / this.formula.calculateLifeMax(this.hero.level)) * 100);
    };
    /** Select the main hero **/
    HeroCardComponent.prototype.mainHero = function () {
        var _this = this;
        this.isLoading = true;
        this.hero.state = 3;
        var state = this.hero.state;
        this.heroService.updateHero(this.hero.id, { state: state })
            .subscribe(function (retour) {
            _this.isLoading = false;
            _this.heroService.setHeroInfo(retour);
        }, function (error) { return _this.errorService.newErrorMessage(error); });
    };
    /** ng Init **/
    HeroCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) {
            return _this.heroService.getHero(parseInt(params.get('id')));
        })
            .subscribe(function (hero) {
            _this.hero = hero;
            _this.initCard();
        }, function (error) { return _this.errorService.newErrorMessage(error); });
    };
    return HeroCardComponent;
}());
HeroCardComponent = __decorate([
    core_1.Component({
        selector: 'hero-card',
        templateUrl: './hero-card.component.html',
    }),
    __metadata("design:paramtypes", [hero_service_1.HeroService,
        error_service_1.ErrorService,
        router_1.ActivatedRoute,
        router_1.Router,
        formula_service_1.FormulaService])
], HeroCardComponent);
exports.HeroCardComponent = HeroCardComponent;
//# sourceMappingURL=hero-card.component.js.map