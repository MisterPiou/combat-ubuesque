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
var server_service_1 = require("./server.service");
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
    function BattleComponent(route, heroService, errorService, serverService, formula) {
        this.route = route;
        this.heroService = heroService;
        this.errorService = errorService;
        this.serverService = serverService;
        this.formula = formula;
        /* Attack */
        this.attacksPercentages = [0, 0, 0];
        /* Character */
        this.hero = new hero_1.Hero(0, 0, "Chargement...", null, 0, 0, 0, 0);
        this.heroLifePercentage = 100;
        this.opponent = new hero_1.Hero(0, 0, "Chargement...", race.Sbire, 0, 0, 0, 0);
        this.opponentLifePercentage = 100;
        this.stateMine = StateBattle.none;
        this.stateOpponent = StateBattle.none;
        this.mineIsReady = false;
        this.opponentIsReady = false;
        this.spellCall = null;
        this.gainXp = 0;
        this.lvlUp = false;
        /* Global */
        this.intervals = [0, 0, 0, 0]; // 4th interval for opponent training
        this.stateGame = StateGame.loading;
        this.isVersus = false;
        this.message = "";
        this.xpPercentage = 0;
    }
    BattleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (+params['id'] == 0) {
                _this.isVersus = false;
                var lvl = +params['lvl'];
                _this.opponent = new hero_1.Hero(0, 0, "Pouchink Paul", race.Sbire, 0, 0, lvl, lvl * 200);
                _this.opponentLifeActual = _this.opponent.life;
                if (_this.hero.level > 0) {
                    _this.stateGame = StateGame.pause;
                }
            }
            else {
                _this.isVersus = true;
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
            _this.heroService.setHeroInfo(hero);
        }, function (error) { return _this.errorService.newErrorMessage(error); });
        this.heroLifeActual = this.hero.life;
        this.serverService.getSocket().on('ready fight', function () {
            if (this.mineIsReady)
                this.stateGame = StateGame.current;
            this.opponentIsReady = true;
        }.bind(this));
    };
    /** Start/End battle **/
    BattleComponent.prototype.startBattle = function () {
        if (!this.isVersus) {
            this.opponentAttack();
            this.stateGame = StateGame.current;
        }
        else {
            this.serverService.getSocket().emit('start battle', this.serverService.getOpponentId());
            if (this.opponentIsReady)
                this.stateGame = StateGame.current;
            this.mineIsReady = true;
            this.serverService.getSocket().on("attack from", function (attack) {
                if (attack.type == Spell.SpellType.attack) {
                    this.heroLoseLife(attack.lifeLose);
                }
                else if (attack.type == Spell.SpellType.freeze) {
                    this.stateMine = StateBattle.freezeOut;
                    this.coolDown(0, attack.lifeLose * 100);
                    this.coolDown(1, attack.lifeLose * 100);
                    this.coolDown(2, attack.lifeLose * 100);
                    this.serverService.getSocket().emit("new state", this.serverService.getOpponentId(), {
                        life: this.heroLifeActual, state: this.stateMine
                    });
                }
            }.bind(this));
            this.serverService.getSocket().on("state opponent", function (newState) {
                this.stateOpponent = newState.state;
                this.opponentLifeActual = newState.life;
                this.opponentLifePercentage = (this.opponentLifeActual / this.opponent.life) * 100;
                this.opponentIsAlive();
            }.bind(this));
        }
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
    /** ATTACK **/
    BattleComponent.prototype.onAttack = function (spell) {
        if (this.stateGame == StateGame.current) {
            if (this.attacksPercentages[spell] == 0 && this.stateMine != StateBattle.freezeOut) {
                var coolDown = this.attackAccordingToType(spell);
                this.coolDown(spell, coolDown * 100);
            }
        }
    };
    // only for training
    BattleComponent.prototype.opponentAttack = function () {
        var _this = this;
        this.clearTimer(3);
        var interval = Math.floor((Math.random() * 1000) + 2000 + 1);
        this.intervals[3] = window.setInterval(function () {
            var power = 5 * _this.opponent.level;
            if (_this.stateMine != StateBattle.freezeIn)
                _this.heroLoseLife(Math.floor((Math.random() * power) + power + 1));
        }, interval);
    };
    BattleComponent.prototype.attackAccordingToType = function (spell) {
        this.spellCall = this.hero.race.spells[spell];
        var power = this.hero.race.spells[spell].effect * this.hero.level;
        var coolDown;
        switch (this.spellCall.type) {
            case (Spell.SpellType.attack): {
                if (this.spellCall.name == "Fourbeur" && this.stateMine != StateBattle.hide)
                    return;
                if (this.stateMine == StateBattle.boost)
                    power *= this.spellCall.ratio;
                this.opponentLoseLife(Math.floor((Math.random() * power) + power + 1));
                coolDown = this.spellCall.cooldown;
                break;
            }
            case (Spell.SpellType.boost): {
                this.stateMine = StateBattle.boost;
                coolDown = this.spellCall.effect;
                if (this.isVersus) {
                    this.serverService.getSocket().emit("new state", this.serverService.getOpponentId(), {
                        life: this.heroLifeActual, state: this.stateMine
                    });
                }
                break;
            }
            case (Spell.SpellType.freeze): {
                this.stateMine = StateBattle.freezeIn;
                coolDown = this.spellCall.effect;
                this.serverService.getSocket().emit("attack to", this.serverService.getOpponentId(), {
                    lifeLose: coolDown,
                    type: this.spellCall.type,
                    name: this.spellCall.name
                });
                break;
            }
            case (Spell.SpellType.shield): {
                this.stateMine = StateBattle.shield;
                coolDown = this.spellCall.effect;
                if (this.isVersus) {
                    this.serverService.getSocket().emit("new state", this.serverService.getOpponentId(), {
                        life: this.heroLifeActual, state: this.stateMine
                    });
                }
                break;
            }
            case (Spell.SpellType.hide): {
                this.stateMine = StateBattle.hide;
                coolDown = this.spellCall.effect;
                if (this.isVersus) {
                    this.serverService.getSocket().emit("new state", this.serverService.getOpponentId(), {
                        life: this.heroLifeActual, state: this.stateMine
                    });
                }
                break;
            }
        }
        return coolDown;
    };
    /** Life **/
    BattleComponent.prototype.opponentLoseLife = function (lifeLose) {
        if (this.isVersus) {
            this.serverService.getSocket().emit("attack to", this.serverService.getOpponentId(), {
                lifeLose: lifeLose,
                type: this.spellCall.type,
                name: this.spellCall.name
            });
        }
        else {
            if (this.stateMine == StateBattle.hide && this.spellCall.name == "Fourbeur") {
                this.opponentAttack();
            }
            this.opponentLifeActual -= lifeLose;
            this.opponentIsAlive();
            this.opponentLifePercentage = (this.opponentLifeActual / this.opponent.life) * 100;
        }
    };
    BattleComponent.prototype.opponentIsAlive = function () {
        if (this.opponentLifeActual <= 0) {
            this.opponentLifeActual = 0;
            this.stateGame = StateGame.victory;
            this.clearTimer(3);
            this.endBattle();
        }
    };
    BattleComponent.prototype.heroLoseLife = function (lifeLose) {
        if (this.stateMine == StateBattle.hide && (Math.random() * 100) > 50)
            return;
        this.heroLifeActual -= lifeLose;
        if (this.heroLifeActual <= 0) {
            this.heroLifeActual = 0;
            this.stateGame = StateGame.defeat;
            this.clearTimer(1);
            this.endBattle();
        }
        this.heroLifePercentage = (this.heroLifeActual / this.hero.life) * 100;
        if (this.isVersus) {
            this.serverService.getSocket().emit("new state", this.serverService.getOpponentId(), {
                life: this.heroLifeActual,
                state: this.stateMine
            });
        }
    };
    /** TIMER **/
    BattleComponent.prototype.clearTimer = function (interval) { clearInterval(this.intervals[interval]); };
    BattleComponent.prototype.coolDown = function (attack, time) {
        var _this = this;
        this.clearTimer(attack);
        if (this.stateMine != StateBattle.none && this.hero.race.spells[attack].type != Spell.SpellType.attack)
            this.attacksPercentages[attack] = 1;
        else
            this.attacksPercentages[attack] = 100;
        var interval = 100 / (time / 200);
        this.intervals[attack] = window.setInterval(function () {
            _this.intervalAnimation(attack, interval);
        }, 200);
    };
    BattleComponent.prototype.intervalAnimation = function (attack, interval) {
        if (this.stateMine != StateBattle.none && this.hero.race.spells[attack].type != Spell.SpellType.attack) {
            this.attacksPercentages[attack] += interval;
            if (this.attacksPercentages[attack] >= 100) {
                this.attacksPercentages[attack] = 0;
                this.clearTimer(attack);
                this.stateMine = StateBattle.none;
                this.coolDown(attack, this.hero.race.spells[attack].cooldown * 100);
                if (this.isVersus) {
                    this.serverService.getSocket().emit("new state", this.serverService.getOpponentId(), {
                        life: this.heroLifeActual,
                        state: this.stateMine
                    });
                }
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
        server_service_1.ServerService,
        formula_service_1.FormulaService])
], BattleComponent);
exports.BattleComponent = BattleComponent;
//# sourceMappingURL=battle.component.js.map