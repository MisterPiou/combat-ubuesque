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
var hero_1 = require("../Hero/hero");
var hero_service_1 = require("../Hero/hero.service");
var BattleComponent = (function () {
    function BattleComponent(route, heroService) {
        this.route = route;
        this.heroService = heroService;
        /* Attaque */
        this.attacksPercentages = [0, 0, 0];
        this.heroLifePercentage = 100;
        this.opponentLifePercentage = 100;
        /* Global */
        this.intervalId = 0;
    }
    BattleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (+params['id'] == 0) {
                _this.opponent = new hero_1.Hero(0, 0, "Pouchink Paul", 0, 0, 0, 1, 100);
                _this.opponentLifeActual = _this.opponent.life;
            }
        });
        this.hero = new hero_1.Hero(1, 1, "Joueur", 0, 0, 0, 1, 100);
        this.heroLifeActual = this.hero.life;
    };
    BattleComponent.prototype.onAttack = function (spell) {
        if (spell == 0 & this.attacksPercentages[spell] == 0) {
            this.opponentLoseLife(Math.floor((Math.random() * 5) + 5 + 1));
            this.coolDown(spell, 3000);
        }
    };
    BattleComponent.prototype.opponentLoseLife = function (lifeLose) {
        this.opponentLifeActual -= lifeLose;
        this.opponentLifePercentage = (this.opponentLifeActual / this.opponent.life) * 100;
    };
    BattleComponent.prototype.clearTimer = function () { clearInterval(this.intervalId); };
    BattleComponent.prototype.coolDown = function (attack, time) {
        var _this = this;
        this.clearTimer();
        this.attacksPercentages[attack] = 100;
        var interval = 100 / (time / 200);
        this.intervalId = window.setInterval(function () {
            _this.attacksPercentages[attack] -= interval;
            if (_this.attacksPercentages[attack] < 0) {
                _this.attacksPercentages[attack] = 0;
                _this.clearTimer();
            }
        }, 200);
    };
    return BattleComponent;
}());
BattleComponent = __decorate([
    core_1.Component({
        selector: 'battle',
        templateUrl: './battle.component.html',
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        hero_service_1.HeroService])
], BattleComponent);
exports.BattleComponent = BattleComponent;
//# sourceMappingURL=battle.component.js.map