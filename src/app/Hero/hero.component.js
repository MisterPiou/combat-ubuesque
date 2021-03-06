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
var hero_1 = require("./class/hero");
var hero_service_1 = require("./hero.service");
var race_service_1 = require("./race.service");
var error_service_1 = require("../Global/error.service");
var formula_service_1 = require("../Global/formula.service");
var HeroComponent = (function () {
    function HeroComponent(heroService, raceService, errorService, router, formula) {
        this.heroService = heroService;
        this.raceService = raceService;
        this.errorService = errorService;
        this.router = router;
        this.formula = formula;
        this.defaultName = "Mon Héros";
        this.isSubmitted = false;
        this.lifePercentage = 0;
        this.model = new hero_1.Hero(1, 1, this.defaultName, null, 0, 0, 1, 100);
        this.races = null;
        this.xpPercentage = 0;
        this.isLoading = false;
    }
    /** Display all heroes **/
    HeroComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes()
            .subscribe(function (heroes) { return _this.heroes = heroes; }, function (error) { return _this.errorService.newErrorMessage(error); });
    };
    /** Display all races **/
    HeroComponent.prototype.getRaces = function () {
        var _this = this;
        this.raceService.getRaces()
            .subscribe(function (races) {
            _this.races = races;
            _this.model.race = _this.races[0];
        }, function (error) { return _this.errorService.newErrorMessage(error); });
    };
    /** Submit form to add new hero **/
    HeroComponent.prototype.onSubmit = function () {
        this.addHero(this.model.name, this.model.race.id);
        this.newHero();
        $('#myModal').modal('hide');
    };
    /** Function to add hero in symfony **/
    HeroComponent.prototype.addHero = function (name, race) {
        var _this = this;
        this.heroService.addHero(name, race)
            .subscribe(function (hero) { return _this.getHeroes(); }, function (error) { return _this.errorService.newErrorMessage(error); });
    };
    /** Reset add hero forms **/
    HeroComponent.prototype.newHero = function () {
        this.model = new hero_1.Hero(1, 1, this.defaultName, null, 0, 0, 1, 100);
    };
    /** When user select a hero on list **/
    HeroComponent.prototype.selectHero = function (hero) {
        this.selectedHero = hero;
        this.xpPercentage = Math.round((hero.xp / this.formula.calculateXpNeed(hero.level)) * 100);
        this.lifePercentage = Math.round((hero.life / this.formula.calculateLifeMax(hero.level)) * 100);
    };
    /** Display hero **/
    HeroComponent.prototype.viewHero = function () {
        this.router.navigate(['/hero/card', this.selectedHero.id]);
    };
    /** Remove hero **/
    HeroComponent.prototype.deleteHero = function () {
        var _this = this;
        /*bootbox.confirm("Voulez-vous vraiment mettre ce héros à la porte?\n[Note: Vous risquez un discour houleux avec le SynHerGy (SYNdicat des HERos GYmnaste)]", function(result) {
            if(result) {
                this.heroService.delete(this.selectedHero.id)
                    .subscribe(
                        heroes => this.heroes = heroes,
                        error =>  this.errorMessage = <any>error);
            }
        });*/
        if (confirm("Voulez-vous vraiment mettre ce héros à la porte?\n[Note: Vous risquez un discour houleux avec le SynHerGy (SYNdicat des HERos GYmnaste)]")) {
            this.heroService.delete(this.selectedHero.id)
                .subscribe(function (heroes) { return _this.heroes = heroes; }, function (error) { return _this.errorService.newErrorMessage(error); });
        }
    };
    /** Select main hero **/
    HeroComponent.prototype.mainHero = function () {
        var _this = this;
        this.isLoading = true;
        this.selectedHero.state = 3;
        var state = this.selectedHero.state;
        this.heroService.updateHero(this.selectedHero.id, { state: state })
            .subscribe(function (retour) {
            _this.isLoading = false;
            _this.getHeroes();
            _this.heroService.setHeroInfo(retour);
        }, function (error) { return _this.errorService.newErrorMessage(error); });
    };
    /** ng Init **/
    HeroComponent.prototype.ngOnInit = function () {
        this.getRaces();
        this.getHeroes();
    };
    return HeroComponent;
}());
HeroComponent = __decorate([
    core_1.Component({
        selector: 'hero',
        templateUrl: './hero.component.html',
    }),
    __metadata("design:paramtypes", [hero_service_1.HeroService,
        race_service_1.RaceService,
        error_service_1.ErrorService,
        router_1.Router,
        formula_service_1.FormulaService])
], HeroComponent);
exports.HeroComponent = HeroComponent;
//# sourceMappingURL=hero.component.js.map