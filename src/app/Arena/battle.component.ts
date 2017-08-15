import {Component, OnInit, OnDestroy}      from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Hero}           from '../Hero/class/hero';
import * as Spell       from '../Hero/class/spell';
import {HeroService}    from '../Hero/hero.service';
import {ErrorService}   from '../Global/error.service';
import {FormulaService} from '../Global/formula.service';
import {ServerService}  from './server.service';

import * as race from '../Hero/class/race';

enum StateGame {
    current = 0,
    victory = 1,
    defeat = 2,
    loading = 8,
    pause = 9
}
enum StateBattle {
    none = 0,
    boost = 1,
    freezeIn = 2,
    freezeOut = 3,
    shield = 4,
    hide = 5,
}

@Component({
  selector: 'battle',
  templateUrl: './battle.component.html',
})
export class BattleComponent implements OnInit, OnDestroy
{
    /* Attack */
    attacksPercentages = [0,0,0];
    /* Character */
    hero: Hero = new Hero(0, 0, "Chargement...", null, 0, 0, 0, 0);
    heroLifeActual: number;
    heroLifePercentage = 100;
    opponent: Hero = new Hero(0, 0, "Chargement...", race.Sbire, 0, 0, 0, 0);
    opponentLifeActual: number;
    opponentLifePercentage = 100;
    stateMine = StateBattle.none;
    stateOpponent = StateBattle.none;
    mineIsReady = false;
    opponentIsReady = false;
    spellCall: Spell.Spell = null;
    gainXp = 0;
    lvlUp = false;
    /* Global */
    intervals = [0,0,0,0]; // 4th interval for opponent training
    stateGame = StateGame.loading;
    isVersus = false;
    message = "";
    xpPercentage = 0;
    
    /** INIT **/
    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        private errorService: ErrorService,
        private serverService: ServerService,
        private formula: FormulaService,
    ) {}
    
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if(+params['id']==0) {
                this.isVersus = false;
                let lvl = +params['lvl'];
                this.opponent = new Hero(0, 0, "Pouchink Paul", race.Sbire, 0, 0, lvl, lvl * 200);
                this.opponentLifeActual = this.opponent.life;
                if (this.hero.level>0) {
                    this.stateGame = StateGame.pause;
                }
            }
            else {
                this.isVersus = true;
                this.heroService.getHero(+params['id']).subscribe(
                    hero => {
                        this.opponent = hero;
                        this.opponentLifeActual = this.opponent.life;
                        if (this.hero.level>0) {
                            this.stateGame = StateGame.pause;
                        }
                    },
                    error => this.errorService.newErrorMessage(error)
                )
            }
        });
        this.heroService.getHeroSelected().subscribe(
            hero => {
                this.hero = hero;
                this.heroLifeActual = this.hero.life;
                if (this.hero.level>0) {
                    this.stateGame = StateGame.pause;
                }
                this.heroService.setHeroInfo(hero);
            },
            error => this.errorService.newErrorMessage(error)
        )
        this.heroLifeActual = this.hero.life;
        this.serverService.getSocket().on('ready fight', function () {
            if(this.mineIsReady)
                this.stateGame = StateGame.current;
            this.opponentIsReady = true;
        }.bind(this));
    }
    
    /** Start/End battle **/
    startBattle() {
        if (!this.isVersus) {
            this.opponentAttack();
            this.stateGame = StateGame.current;
        }
        else {
            this.serverService.getSocket().emit('start battle', this.serverService.getOpponentId());
            if(this.opponentIsReady)
                this.stateGame = StateGame.current;
            this.mineIsReady = true;
            this.serverService.getSocket().on("attack from", function(attack: any) {
                if(attack.type==Spell.SpellType.attack){
                    this.heroLoseLife(attack.lifeLose);
                }
                else if (attack.type == Spell.SpellType.freeze){
                    this.stateMine = StateBattle.freezeOut;
                    this.coolDown(0, attack.lifeLose * 100);
                    this.coolDown(1, attack.lifeLose * 100);
                    this.coolDown(2, attack.lifeLose * 100);
                    this.serverService.getSocket().emit("new state", this.serverService.getOpponentId(), 
                    {
                        life: this.heroLifeActual, state: this.stateMine
                    });
                }
            }.bind(this));
            this.serverService.getSocket().on("state opponent", function(newState: any) {
                this.stateOpponent = newState.state;
                this.opponentLifeActual = newState.life;
                this.opponentLifePercentage = (this.opponentLifeActual / this.opponent.life ) * 100;
                this.opponentIsAlive();
            }.bind(this));
        }
    }
    
    endBattle() {
        let xpNeed = this.formula.calculateXpNeed(this.hero.level);
        
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
        this.xpPercentage = Math.round((this.hero.xp / xpNeed) * 100 );
        
        let lvl = this.hero.level;
        let xp = this.hero.xp;
        this.heroService.updateHero(this.hero.id, {lvl,xp}).subscribe(
            hero => null, error => this.errorService.newErrorMessage(error)
        );
    }
    
    /** ATTACK **/
    onAttack(spell: number) {
        if (this.stateGame == StateGame.current) 
        {
            if (this.attacksPercentages[spell] == 0 && this.stateMine != StateBattle.freezeOut) 
            {
                let coolDown = this.attackAccordingToType(spell);
                
                this.coolDown(spell, coolDown * 100);
            }
        }
    }
    
    // only for training
    opponentAttack() {
        this.clearTimer(3);
        let interval = Math.floor((Math.random() * 1000) + 2000 + 1);
        this.intervals[3] = window.setInterval(() => {
            let power = 5 * this.opponent.level;
            if (this.stateMine != StateBattle.freezeIn)
                this.heroLoseLife(Math.floor((Math.random() * power) + power + 1));
        }, interval);
    }
    
    attackAccordingToType(spell: number) {
        this.spellCall = this.hero.race.spells[spell];
        let power = this.hero.race.spells[spell].effect * this.hero.level;
        let coolDown;
        switch (this.spellCall.type) {
            case (Spell.SpellType.attack):{
                if (this.spellCall.name=="Fourbeur" && this.stateMine != StateBattle.hide)
                    return;
                if (this.stateMine == StateBattle.boost)
                    power *= this.spellCall.ratio;
                this.opponentLoseLife(Math.floor((Math.random() * power) + power + 1));
                coolDown = this.spellCall.cooldown;
                break; 
            }
            case (Spell.SpellType.boost):{
                this.stateMine = StateBattle.boost;
                coolDown = this.spellCall.effect;
                if (this.isVersus) {
                    this.serverService.getSocket().emit("new state", this.serverService.getOpponentId(), 
                    {
                        life: this.heroLifeActual, state: this.stateMine
                    });
                }
                break; 
            }
            case (Spell.SpellType.freeze):{
                this.stateMine = StateBattle.freezeIn;
                coolDown = this.spellCall.effect;
                this.serverService.getSocket().emit("attack to", this.serverService.getOpponentId(), 
                {
                    lifeLose: coolDown,
                    type: this.spellCall.type,
                    name: this.spellCall.name
                });
                break; 
            }
            case (Spell.SpellType.shield):{
                this.stateMine = StateBattle.shield;
                coolDown = this.spellCall.effect;
                if (this.isVersus) {
                    this.serverService.getSocket().emit("new state", this.serverService.getOpponentId(), 
                    {
                        life: this.heroLifeActual, state: this.stateMine
                    });
                }
                break; 
            }
            case (Spell.SpellType.hide):{
                this.stateMine = StateBattle.hide;
                coolDown = this.spellCall.effect;
                if (this.isVersus) {
                    this.serverService.getSocket().emit("new state", this.serverService.getOpponentId(), 
                    {
                        life: this.heroLifeActual, state: this.stateMine
                    });
                }
                break; 
            }
        }
        return coolDown;
    }
    
    /** Life **/
    private opponentLoseLife(lifeLose: number) {
        
        if (this.isVersus) {
            this.serverService.getSocket().emit("attack to", this.serverService.getOpponentId(), 
              {
               lifeLose: lifeLose,
               type: this.spellCall.type,
               name: this.spellCall.name
            });
        }
        else {
            if (this.stateMine == StateBattle.hide && this.spellCall.name=="Fourbeur"){
                this.opponentAttack();
            }

            this.opponentLifeActual -= lifeLose;
            this.opponentIsAlive();
            this.opponentLifePercentage = (this.opponentLifeActual / this.opponent.life ) * 100;
        }
    }
    
    private opponentIsAlive() {
        if(this.opponentLifeActual <= 0) {
            this.opponentLifeActual = 0;
            this.stateGame = StateGame.victory;
            this.clearTimer(3);
            this.endBattle();
        }
    }
    
    private heroLoseLife(lifeLose: number) {
        if (this.stateMine == StateBattle.hide && (Math.random()*100)>50)
            return;
        
        this.heroLifeActual -= lifeLose;
        if(this.heroLifeActual <= 0) {
            this.heroLifeActual = 0;
            this.stateGame = StateGame.defeat;
            this.clearTimer(1);
            this.endBattle();
        }
        this.heroLifePercentage = (this.heroLifeActual / this.hero.life ) * 100;
        
        if (this.isVersus) {
            this.serverService.getSocket().emit("new state", this.serverService.getOpponentId(), 
              {
               life: this.heroLifeActual,
               state: this.stateMine
            });
        }
    }
    
    
    /** TIMER **/
    clearTimer(interval: number) { clearInterval(this.intervals[interval]); }
    
    private coolDown(attack: number, time: number) {
        this.clearTimer(attack);
        if (this.stateMine != StateBattle.none && this.hero.race.spells[attack].type != Spell.SpellType.attack) 
            this.attacksPercentages[attack] = 1;
        else
            this.attacksPercentages[attack] = 100;
        let interval = 100 / (time / 200);
        this.intervals[attack] = window.setInterval(() => {
            this.intervalAnimation(attack, interval);
        }, 200);
    }
    
    private intervalAnimation(attack: number, interval: number) {
        if (this.stateMine != StateBattle.none && this.hero.race.spells[attack].type != Spell.SpellType.attack) {
            this.attacksPercentages[attack] += interval;
            if(this.attacksPercentages[attack] >= 100) {
                this.attacksPercentages[attack] = 0;
                this.clearTimer(attack);
                this.stateMine = StateBattle.none;
                this.coolDown(attack, this.hero.race.spells[attack].cooldown * 100);
                if (this.isVersus) {
                    this.serverService.getSocket().emit("new state", this.serverService.getOpponentId(), 
                      {
                       life: this.heroLifeActual,
                       state: this.stateMine
                    });
                }
            }
        } else {
            this.attacksPercentages[attack] -= interval;
            if(this.attacksPercentages[attack] < 0) {
                this.attacksPercentages[attack] = 0;
                this.clearTimer(attack);
            }
        }
    }
    
    ngOnDestroy() {
        for (let i = 0; i < this.intervals.length; i++){
            this.clearTimer(i);
        }
    }
}
