import {Component, OnInit}      from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Hero}           from '../Hero/hero';
import {HeroService}    from '../Hero/hero.service';

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
    intervalId = 0;
    
    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService
    ) {}
    
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if(+params['id']==0) {
                this.opponent = new Hero(0, 0, "Pouchink Paul", 0, 0, 0, 1, 100);
                this.opponentLifeActual = this.opponent.life;
            }
        });
        this.hero = new Hero(1, 1, "Joueur", 0, 0, 0, 1, 100);
        this.heroLifeActual = this.hero.life;
    }
    
    onAttack(spell: number) {
        if(spell==0 & this.attacksPercentages[spell] == 0) {
            this.opponentLoseLife(Math.floor((Math.random() * 5) + 5 + 1));
            this.coolDown(spell, 3000);
        }
    }
    
    private opponentLoseLife(lifeLose: number) {
        this.opponentLifeActual -= lifeLose;
        this.opponentLifePercentage = (this.opponentLifeActual / this.opponent.life ) * 100;
    }
    
    clearTimer() { clearInterval(this.intervalId); }
    
    private coolDown(attack: number, time: number) {
        this.clearTimer();
        this.attacksPercentages[attack] = 100;
        let interval = 100 / (time / 200);
        this.intervalId = window.setInterval(() => {
            this.attacksPercentages[attack] -= interval;
            if(this.attacksPercentages[attack] < 0) {
                this.attacksPercentages[attack] = 0;
                this.clearTimer();
            }
        }, 200);
    }
    
}
