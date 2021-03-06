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
var Spell = require("../Hero/class/spell");
var hero_service_1 = require("../Hero/hero.service");
var error_service_1 = require("../Global/error.service");
var formula_service_1 = require("../Global/formula.service");
var race = require("../Hero/class/race");
var StateGame;
(function (StateGame) {
    StateGame[StateGame["current"] = 0] = "current";
    StateGame[StateGame["victory"] = 1] = "victory";
    StateGame[StateGame["defeat"] = 2] = "defeat";
    StateGame[StateGame["loading"] = 8] = "loading";
    StateGame[StateGame["pause"] = 9] = "pause";
})(StateGame || (StateGame = {}));
var StateBattle;
(function (StateBattle) {
    StateBattle[StateBattle["none"] = 0] = "none";
    StateBattle[StateBattle["boost"] = 1] = "boost";
    StateBattle[StateBattle["freezeIn"] = 2] = "freezeIn";
    StateBattle[StateBattle["freezeOut"] = 3] = "freezeOut";
    StateBattle[StateBattle["shield"] = 4] = "shield";
    StateBattle[StateBattle["hide"] = 5] = "hide";
})(StateBattle || (StateBattle = {}));
var BattleComponent = (function () {
    /** INIT **/
    function BattleComponent(route, heroService, errorService, formula) {
        this.route = route;
        this.heroService = heroService;
        this.errorService = errorService;
        this.formula = formula;
        /* Attaque */
        this.attacksPercentages = [0, 0, 0];
        /* Personnage */
        this.hero = new hero_1.Hero(0, 0, "Chargement...", null, 0, 0, 0, 0);
        this.heroLifePercentage = 100;
        this.opponent = new hero_1.Hero(0, 0, "Chargement...", race.Sbire, 0, 0, 0, 0);
        this.opponentLifePercentage = 100;
        this.spellCall = null;
        this.gainXp = 0;
        this.lvlUp = false;
        /* Global */
        this.intervals = [0, 0, 0, 0];
        this.stateGame = StateGame.loading;
        this.stateBattle = StateBattle.none;
        this.message = "";
        this.xpPercentage = 0;
    }
    BattleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (+params['id'] == 0) {
                var lvl = +params['lvl'];
                _this.opponent = new hero_1.Hero(0, 0, "Pouchink Paul", race.Sbire, 0, 0, lvl, lvl * 200);
                _this.opponentLifeActual = _this.opponent.life;
                if (_this.hero.level > 0) {
                    _this.stateGame = StateGame.pause;
                }
            }
            else {
                _this.heroService.getHero(+params['id']).subscribe(function (hero) {
                    _this.opponent = hero;
                    _this.opponentLifeActual = _this.opponent.life;
                    if (_this.hero.level > 0) {
                        _this.stateGame = StateGame.pause;
                    }
                }, function (error) { return _this.errorService.newErrorMessage(error); });
            }
        });
        this.heroService.getHeroSelected().subscribe(function (hero) {
            _this.hero = hero;
            _this.heroLifeActual = _this.hero.life;
            if (_this.hero.level > 0) {
                _this.stateGame = StateGame.pause;
            }
        }, function (error) { return _this.errorService.newErrorMessage(error); });
        this.heroLifeActual = this.hero.life;
    };
    /** Start/End battle **/
    BattleComponent.prototype.startBattle = function () {
        this.stateGame = StateGame.current;
        if (this.opponent.id == 0)
            this.opponentAttack();
    };
    BattleComponent.prototype.endBattle = function () {
        var _this = this;
        var xpNeed = this.formula.calculateXpNeed(this.hero.level);
        if (this.stateGame == StateGame.victory) {
            this.gainXp = this.formula.calculateXpVictory(this.hero.level, this.opponent.level);
            this.message = "Victoire !";
        }
        if (this.stateGame == StateGame.defeat) {
            this.gainXp = this.formula.calculateXpDefeat(this.hero.level, this.opponent.level);
            this.message = "Defaite...";
        }
        this.hero.xp += this.gainXp;
        if (this.hero.xp >= xpNeed) {
            this.lvlUp = true;
            this.hero.level += 1;
            this.hero.xp = this.hero.xp - xpNeed;
        }
        this.xpPercentage = Math.round((this.hero.xp / xpNeed) * 100);
        var lvl = this.hero.level;
        var xp = this.hero.xp;
        this.heroService.updateHero(this.hero.id, { lvl: lvl, xp: xp }).subscribe(function (hero) { return null; }, function (error) { return _this.errorService.newErrorMessage(error); });
    };
    /** ATTAQUE **/
    BattleComponent.prototype.onAttack = function (spell) {
        if (this.stateGame == StateGame.current) {
            if (this.attacksPercentages[spell] == 0) {
                this.spellCall = this.hero.race.spells[spell];
                var power = this.hero.race.spells[spell].effect * this.hero.level;
                var coolDown = void 0;
                switch (this.spellCall.type) {
                    case (Spell.SpellType.attack): {
                        if (this.spellCall.name == "Fourbeur" && this.stateBattle != StateBattle.hide)
                            return;
                        if (this.stateBattle == StateBattle.boost)
                            power *= this.spellCall.ratio;
                        this.opponentLoseLife(Math.floor((Math.random() * power) + power + 1));
                        coolDown = this.spellCall.cooldown;
                        break;
                    }
                    case (Spell.SpellType.boost): {
                        this.stateBattle = StateBattle.boost;
                        coolDown = this.spellCall.effect;
                        break;
                    }
                    case (Spell.SpellType.freeze): {
                        this.stateBattle = StateBattle.freezeIn;
                        coolDown = this.spellCall.effect;
                        break;
                    }
                    case (Spell.SpellType.shield): {
                        this.stateBattle = StateBattle.shield;
                        coolDown = this.spellCall.effect;
                        break;
                    }
                    case (Spell.SpellType.hide): {
                        this.stateBattle = StateBattle.hide;
                        coolDown = this.spellCall.effect;
                        break;
                    }
                }
                this.coolDown(spell, coolDown * 100);
            }
        }
    };
    BattleComponent.prototype.opponentAttack = function () {
        var _this = this;
        this.clearTimer(3);
        var interval = Math.floor((Math.random() * 1000) + 2000 + 1);
        this.intervals[3] = window.setInterval(function () {
            var power = 5 * _this.opponent.level;
            if (_this.stateBattle != StateBattle.freezeIn)
                _this.heroLoseLife(Math.floor((Math.random() * power) + power + 1));
        }, interval);
    };
    /** Heroes Life **/
    BattleComponent.prototype.opponentLoseLife = function (lifeLose) {
        if (this.stateBattle == StateBattle.hide && this.spellCall.name == "Fourbeur") {
            this.opponentAttack();
        }
        this.opponentLifeActual -= lifeLose;
        if (this.opponentLifeActual <= 0) {
            this.opponentLifeActual = 0;
            this.stateGame = StateGame.victory;
            this.clearTimer(3);
            this.endBattle();
        }
        this.opponentLifePercentage = (this.opponentLifeActual / this.opponent.life) * 100;
    };
    BattleComponent.prototype.heroLoseLife = function (lifeLose) {
        if (this.stateBattle == StateBattle.hide && (Math.random() * 100) > 50)
            return;
        this.heroLifeActual -= lifeLose;
        if (this.heroLifeActual <= 0) {
            this.heroLifeActual = 0;
            this.stateGame = StateGame.defeat;
            this.clearTimer(1);
            this.endBattle();
        }
        this.heroLifePercentage = (this.heroLifeActual / this.hero.life) * 100;
    };
    /** TIMER **/
    BattleComponent.prototype.clearTimer = function (interval) { clearInterval(this.intervals[interval]); };
    BattleComponent.prototype.coolDown = function (attack, time) {
        var _this = this;
        console.log("Attack " + attack + " launch for " + time + "ms");
        this.clearTimer(attack);
        if (this.stateBattle != StateBattle.none && this.hero.race.spells[attack].type != Spell.SpellType.attack)
            this.attacksPercentages[attack] = 1;
        else
            this.attacksPercentages[attack] = 100;
        var interval = 100 / (time / 200);
        this.intervals[attack] = window.setInterval(function () {
            _this.intervalAnimation(attack, interval);
        }, 200);
    };
    BattleComponent.prototype.intervalAnimation = function (attack, interval) {
        if (this.stateBattle != StateBattle.none && this.hero.race.spells[attack].type != Spell.SpellType.attack) {
            this.attacksPercentages[attack] += interval;
            if (this.attacksPercentages[attack] >= 100) {
                this.attacksPercentages[attack] = 0;
                this.clearTimer(attack);
                this.stateBattle = StateBattle.none;
                this.coolDown(attack, this.hero.race.spells[attack].cooldown * 100);
            }
        }
        else {
            this.attacksPercentages[attack] -= interval;
            if (this.attacksPercentages[attack] < 0) {
                this.attacksPercentages[attack] = 0;
                this.clearTimer(attack);
            }
        }
    };
    BattleComponent.prototype.ngOnDestroy = function () {
        for (var i = 0; i < this.intervals.length; i++) {
            this.clearTimer(i);
        }
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