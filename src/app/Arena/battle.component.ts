import {Component, OnInit}      from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Hero}           from '../Hero/class/hero';
import * as Spell       from '../Hero/class/spell';
import {HeroService}    from '../Hero/hero.service';
import {ErrorService}   from '../Global/error.service';
import {FormulaService}   from '../Global/formula.service';

import * as race from '../Hero/class/race';

enum StateGame {
    current = 0,
    victory = 1,
    defeat = 2,
    loading = 8,
    pause = 9
}

@Component({
  selector: 'battle',
  templateUrl: './battle.component.html',
})
export class BattleComponent implements OnInit
{
    /* Attaque */
    attacksPercentages = [0,0,0];
    /* Personnage */
    hero: Hero = new Hero(0, 0, "Chargement...", null, 0, 0, 0, 0);
    heroLifeActual: number;
    heroLifePercentage = 100;
    opponent: Hero = new Hero(0, 0, "Chargement...", race.Sbire, 0, 0, 0, 0);
    opponentLifeActual: number;
    opponentLifePercentage = 100;
    /* Global */
    intervals = [0,0,0,0];
    stateGame = StateGame.loading;
    message = "";
    xpPercentage = 0;
    
    /** INIT **/
    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        private errorService: ErrorService,
        private formula: FormulaService,
    ) {}
    
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if(+params['id']==0) {
                let lvl = +params['lvl'];
                this.opponent = new Hero(0, 0, "Pouchink Paul", race.Sbire, 0, 0, lvl, lvl * 100);
                this.opponentLifeActual = this.opponent.life;
                if (this.hero.level>0) {
                    this.stateGame = StateGame.pause;
                }
            }
            else {
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
            },
            error => this.errorService.newErrorMessage(error)
        )
        this.heroLifeActual = this.hero.life;
    }
    
    startBattle() {
        this.stateGame = StateGame.current;
        if (this.opponent.id==0)
            this.opponentAttack();
    }
    
    endBattle() {
        let xpNeed = this.formula.calculateXpNeed(this.hero.level);
        
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
        this.xpPercentage = Math.round((this.hero.xp / xpNeed) * 100 );
        
        let lvl = this.hero.level;
        let xp = this.hero.xp;
        this.heroService.updateHero(this.hero.id, {lvl,xp}).subscribe(
            hero => null, error => this.errorService.newErrorMessage(error)
        );
    }
    
    /** ATTAQUE **/
    onAttack(spell: number) {
        if (this.stateGame == StateGame.current) {
            if(this.attacksPercentages[spell] == 0) {
                let spellCall: Spell.Spell = this.hero.race.spells[spell];
                let power = this.hero.race.spells[spell].effect * this.hero.level;
                switch (spellCall.type) {
                    case Spell.SpellType.attack:{
                        this.opponentLoseLife(Math.floor((Math.random() * power) + power + 1));
                    }
                    case Spell.SpellType.boost:{
                        
                    }
                    case Spell.SpellType.freeze:{
                        
                    }
                    case Spell.SpellType.shield:{
                        
                    }
                    case Spell.SpellType.hide:{
                        
                    }
                }
                this.coolDown(spell, spellCall.cooldown * 100);
            }
        }
    }
    
    opponentAttack() {
        this.clearTimer(3);
        let interval = Math.floor((Math.random() * 1000) + 2000 + 1);
        this.intervals[3] = window.setInterval(() => {
            let power = 5 * this.opponent.level;
            this.heroLoseLife(Math.floor((Math.random() * power) + power + 1));
        }, interval);
    }
    
    /** VIE **/
    private opponentLoseLife(lifeLose: number) {
        this.opponentLifeActual -= lifeLose;
        if(this.opponentLifeActual <= 0) {
            this.opponentLifeActual = 0;
            this.stateGame = StateGame.victory;
            this.clearTimer(3);
            this.endBattle();
        }
        this.opponentLifePercentage = (this.opponentLifeActual / this.opponent.life ) * 100;
    }
    
    private heroLoseLife(lifeLose: number) {
        this.heroLifeActual -= lifeLose;
        if(this.heroLifeActual <= 0) {
            this.heroLifeActual = 0;
            this.stateGame = StateGame.defeat;
            this.clearTimer(1);
            this.endBattle();
        }
        this.heroLifePercentage = (this.heroLifeActual / this.hero.life ) * 100;
    }
    
    
    /** TIMER **/
    clearTimer(interval: number) { clearInterval(this.intervals[interval]); }
    
    private coolDown(attack: number, time: number) {
        this.clearTimer(attack);
        this.attacksPercentages[attack] = 100;
        let interval = 100 / (time / 200);
        this.intervals[attack] = window.setInterval(() => {
            this.attacksPercentages[attack] -= interval;
            if(this.attacksPercentages[attack] < 0) {
                this.attacksPercentages[attack] = 0;
                this.clearTimer(attack);
            }
        }, 200);
    }
    
}
