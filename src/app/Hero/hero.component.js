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
var hero_1 = require("./hero");
var hero_service_1 = require("./hero.service");
var race_1 = require("./race");
var HeroComponent = (function () {
    function HeroComponent(heroService) {
        this.heroService = heroService;
        this.defaultName = "Mon Héros";
        this.isSubmitted = false;
        this.model = new hero_1.Hero(1, 1, this.defaultName, 1, 0, 0, 1, 100);
        this.races = race_1.RACES;
    }
    HeroComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes()
            .subscribe(function (heroes) { return _this.heroes = heroes; }, function (error) { return _this.errorMessage = error; });
    };
    HeroComponent.prototype.onSubmit = function () {
        this.heroes.push(this.model);
        this.model = new hero_1.Hero(1, 1, this.defaultName, 1, 0, 0, 1, 100);
        $('#myModal').modal('hide');
    };
    HeroComponent.prototype.newHero = function () {
        this.model = new hero_1.Hero(1, 1, this.defaultName, 1, 0, 0, 1, 100);
    };
    HeroComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    HeroComponent.prototype.selectHero = function (hero) {
        this.selectedHero = hero;
    };
    return HeroComponent;
}());
HeroComponent = __decorate([
    core_1.Component({
        selector: 'hero',
        templateUrl: './hero.component.html',
    }),
    __metadata("design:paramtypes", [hero_service_1.HeroService])
], HeroComponent);
exports.HeroComponent = HeroComponent;
//# sourceMappingURL=hero.component.js.map