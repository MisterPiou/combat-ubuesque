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
var hero_1 = require("../Hero/class/hero");
var hero_service_1 = require("../Hero/hero.service");
var error_service_1 = require("../Global/error.service");
var formula_service_1 = require("../Global/formula.service");
var StateGame;
(function (StateGame) {
    StateGame[StateGame["current"] = 0] = "current";
    StateGame[StateGame["victory"] = 1] = "victory";
    StateGame[StateGame["defeat"] = 2] = "defeat";
    StateGame[StateGame["pause"] = 9] = "pause";
})(StateGame || (StateGame = {}));
var BattleComponent = (function () {
    /** INIT **/
    function BattleComponent(route, heroService, errorService, formula) {
        this.route = route;
        this.heroService = heroService;
        this.errorService = errorService;
        this.formula = formula;
        /* Attaque */
        this.attacksPercentages = [0, 0, 0];
        this.heroLifePercentage = 100;
        this.opponentLifePercentage = 100;
        /* Global */
        this.intervals = [0, 0];
        this.stateGame = StateGame.pause;
        this.message = "";
        this.xpPercentage = 0;
    }
    BattleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (+params['id'] == 0) {
                var lvl = +params['lvl'];
                _this.opponent = new hero_1.Hero(0, 0, "Pouchink Paul", 0, 0, 0, lvl, lvl * 100);
                _this.opponentLifeActual = _this.opponent.life;
            }
            else {
            }
        });
        this.heroService.getHeroSelected().subscribe(function (hero) { return _this.hero = hero; }, function (error) { return _this.errorService.newErrorMessage(error.message); });
        this.hero = new hero_1.Hero(1, 1, "Joueur", 0, 0, 0, 1, 100);
        this.heroLifeActual = this.hero.life;
    };
    BattleComponent.prototype.startBattle = function () {
        this.stateGame = StateGame.current;
        this.opponentAttack();
    };
    BattleComponent.prototype.endBattle = function () {
        var _this = this;
        var xpNeed = this.formula.calculateXpNeed(this.hero.level);
        if (this.stateGame == StateGame.victory) {
            this.hero.xp += this.formula.calculateXpVictory(this.hero.level, this.opponent.level);
            this.message = "Victoire !";
        }
        if (this.stateGame == StateGame.defeat) {
            this.hero.xp += this.formula.calculateXpDefeat(this.hero.level, this.opponent.level);
            this.message = "Defaite...";
        }
        if (this.hero.xp >= xpNeed) {
            this.message += "<br />Tu as gagné un level !";
            this.hero.level += 1;
            this.hero.xp = this.hero.xp - xpNeed;
        }
        this.xpPercentage = Math.round((this.hero.xp / xpNeed) * 100);
        var lvl = this.hero.level;
        var xp = this.hero.xp;
        this.heroService.updateHero(this.hero.id, { lvl: lvl, xp: xp }).subscribe(function (hero) { return null; }, function (error) { return _this.errorService.newErrorMessage(error.message); });
    };
    /** ATTAQUE **/
    BattleComponent.prototype.onAttack = function (spell) {
        if (this.stateGame == StateGame.current) {
            if (spell == 0 && this.attacksPercentages[spell] == 0) {
                var power = 5 * this.hero.level;
                this.opponentLoseLife(Math.floor((Math.random() * power) + power + 1));
                this.coolDown(spell, 2000);
            }
        }
    };
    BattleComponent.prototype.opponentAttack = function () {
        var _this = this;
        this.clearTimer(1);
        var interval = Math.floor((Math.random() * 1000) + 2000 + 1);
        this.intervals[1] = window.setInterval(function () {
            var power = 5 * _this.opponent.level;
            _this.heroLoseLife(Math.floor((Math.random() * power) + power + 1));
        }, interval);
    };
    /** VIE **/
    BattleComponent.prototype.opponentLoseLife = function (lifeLose) {
        this.opponentLifeActual -= lifeLose;
        if (this.opponentLifeActual <= 0) {
            this.opponentLifeActual = 0;
            this.stateGame = StateGame.victory;
            this.clearTimer(1);
            this.endBattle();
        }
        this.opponentLifePercentage = (this.opponentLifeActual / this.opponent.life) * 100;
    };
    BattleComponent.prototype.heroLoseLife = function (lifeLose) {
        this.heroLifeActual -= lifeLose;
        if (this.heroLifeActual <= 0) {
            this.heroLifeActual = 0;
            this.stateGame = StateGame.defeat;
            this.clearTimer(1);
            this.endBattle();
        }
        else {
            this.opponentAttack();
        }
        this.heroLifePercentage = (this.heroLifeActual / this.hero.life) * 100;
    };
    /** TIMER **/
    BattleComponent.prototype.clearTimer = function (interval) { clearInterval(this.intervals[interval]); };
    BattleComponent.prototype.coolDown = function (attack, time) {
        var _this = this;
        this.clearTimer(0);
        this.attacksPercentages[attack] = 100;
        var interval = 100 / (time / 200);
        this.intervals[0] = window.setInterval(function () {
            _this.attacksPercentages[attack] -= interval;
            if (_this.attacksPercentages[attack] < 0) {
                _this.attacksPercentages[attack] = 0;
                _this.clearTimer(0);
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
        hero_service_1.HeroService,
        error_service_1.ErrorService,
        formula_service_1.FormulaService])
], BattleComponent);
exports.BattleComponent = BattleComponent;
//# sourceMappingURL=battle.component.js.map