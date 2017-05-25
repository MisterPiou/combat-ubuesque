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
var error_service_1 = require("../Global/error.service");
var HeroComponent = (function () {
    function HeroComponent(heroService, errorService) {
        this.heroService = heroService;
        this.errorService = errorService;
        this.defaultName = "Mon Héros";
        this.onErrMess = new core_1.EventEmitter();
        this.isSubmitted = false;
        this.lifePercentage = 0;
        this.model = new hero_1.Hero(1, 1, this.defaultName, 1, 0, 0, 1, 100);
        this.races = race_1.RACES;
        this.xpPercentage = 0;
    }
    /** Display all heroes **/
    HeroComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes()
            .subscribe(function (heroes) { return _this.heroes = heroes; }, function (error) { return _this.errorService.newErrorMessage(error.message); });
    };
    /** Submit form to add new hero **/
    HeroComponent.prototype.onSubmit = function () {
        this.addHero(this.model.name, this.model.race);
        this.newHero();
        $('#myModal').modal('hide');
    };
    /** Function to add hero in symfony **/
    HeroComponent.prototype.addHero = function (name, race) {
        var _this = this;
        this.heroService.addHero(name, race)
            .subscribe(function (hero) { return _this.heroes.push(hero); }, function (error) { return _this.onErrMess.emit(error.message); });
    };
    /** Reset add hero forms **/
    HeroComponent.prototype.newHero = function () {
        this.model = new hero_1.Hero(1, 1, this.defaultName, 1, 0, 0, 1, 100);
    };
    /** When user select a hero on list **/
    HeroComponent.prototype.selectHero = function (hero) {
        this.selectedHero = hero;
        this.xpPercentage = (hero.xp / (hero.level * 10)) * 100;
        this.lifePercentage = (hero.life / ((hero.level * 5) + 95)) * 100;
    };
    /** Voir le hero **/
    HeroComponent.prototype.viewHero = function () {
    };
    /** Supprime le hero **/
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
                .subscribe(function (heroes) { return _this.heroes = heroes; }, function (error) { return _this.onErrMess.emit(error.message); });
        }
    };
    /** ng Init **/
    HeroComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    return HeroComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HeroComponent.prototype, "onErrMess", void 0);
HeroComponent = __decorate([
    core_1.Component({
        selector: 'hero',
        templateUrl: './hero.component.html',
    }),
    __metadata("design:paramtypes", [hero_service_1.HeroService,
        error_service_1.ErrorService])
], HeroComponent);
exports.HeroComponent = HeroComponent;
//# sourceMappingURL=hero.component.js.map