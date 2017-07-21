import {Component, OnInit}      from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Hero}           from '../Hero/class/hero';
import {HeroService}    from '../Hero/hero.service';
import {ErrorService}   from '../Global/error.service';

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
    stateGame = 9; // 0:en cours - 1:victoire - 2: defaite - 9:pause
    
    /** INIT **/
    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        private errorService: ErrorService
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
        this.stateGame = 0;
        this.opponentAttack();
    }
    
    endBattle() {
        
    }
    
    /** ATTAQUE **/
    onAttack(spell: number) {
        if (this.stateGame == 0) {
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
            this.stateGame = 1;
            this.clearTimer(1);
        }
        this.opponentLifePercentage = (this.opponentLifeActual / this.opponent.life ) * 100;
    }
    
    private heroLoseLife(lifeLose: number) {
        this.heroLifeActual -= lifeLose;
        if(this.heroLifeActual <= 0) {
            this.heroLifeActual = 0;
            this.stateGame = 2;
        }
        this.heroLifePercentage = (this.heroLifeActual / this.hero.life ) * 100;
        this.opponentAttack();
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
