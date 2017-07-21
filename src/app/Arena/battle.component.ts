import {Component, OnInit}      from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Hero}           from '../Hero/class/hero';
import {HeroService}    from '../Hero/hero.service';
import {ErrorService}   from '../Global/error.service';
import {FormulaService}   from '../Global/formula.service';

enum StateGame {
    current = 0,
    victory = 1,
    defeat = 2,
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
    hero: Hero;
    heroLifeActual: number;
    heroLifePercentage = 100;
    opponent: Hero;
    opponentLifeActual: number;
    opponentLifePercentage = 100;
    /* Global */
    intervals = [0,0];
    stateGame = StateGame.pause;
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
                this.opponent = new Hero(0, 0, "Pouchink Paul", 0, 0, 0, lvl, lvl * 100);
                this.opponentLifeActual = this.opponent.life;
            }
            else {
                
            }
        });
        this.heroService.getHeroSelected().subscribe(
            hero => this.hero = hero,
            error => this.errorService.newErrorMessage(error.message)
        )
        this.hero = new Hero(1, 1, "Joueur", 0, 0, 0, 1, 100);
        this.heroLifeActual = this.hero.life;
    }
    
    startBattle() {
        this.stateGame = StateGame.current;
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
            hero => null, error => this.errorService.newErrorMessage(error.message)
        );
    }
    
    /** ATTAQUE **/
    onAttack(spell: number) {
        if (this.stateGame == StateGame.current) {
            if(spell==0 && this.attacksPercentages[spell] == 0) {
                let power = 5 * this.hero.level;
                this.opponentLoseLife(Math.floor((Math.random() * power) + power + 1));
                this.coolDown(spell, 2000);
            }
        }
    }
    
    opponentAttack() {
        this.clearTimer(1);
        let interval = Math.floor((Math.random() * 1000) + 2000 + 1);
        this.intervals[1] = window.setInterval(() => {
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
            this.clearTimer(1);
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
        } else {
            this.opponentAttack();
        }
        this.heroLifePercentage = (this.heroLifeActual / this.hero.life ) * 100;
    }
    
    
    /** TIMER **/
    clearTimer(interval: number) { clearInterval(this.intervals[interval]); }
    
    private coolDown(attack: number, time: number) {
        this.clearTimer(0);
        this.attacksPercentages[attack] = 100;
        let interval = 100 / (time / 200);
        this.intervals[0] = window.setInterval(() => {
            this.attacksPercentages[attack] -= interval;
            if(this.attacksPercentages[attack] < 0) {
                this.attacksPercentages[attack] = 0;
                this.clearTimer(0);
            }
        }, 200);
    }
    
}
