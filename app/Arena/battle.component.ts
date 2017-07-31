import {Component, OnInit, OnDestroy}      from '@angular/core';
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
    /* Attaque */
    attacksPercentages = [0,0,0];
    /* Personnage */
    hero: Hero = new Hero(0, 0, "Chargement...", null, 0, 0, 0, 0);
    heroLifeActual: number;
    heroLifePercentage = 100;
    opponent: Hero = new Hero(0, 0, "Chargement...", race.Sbire, 0, 0, 0, 0);
    opponentLifeActual: number;
    opponentLifePercentage = 100;
    spellCall: Spell.Spell = null;
    gainXp = 0;
    lvlUp = false;
    /* Global */
    intervals = [0,0,0,0];
    stateGame = StateGame.loading;
    stateBattle = StateBattle.none;
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
                this.opponent = new Hero(0, 0, "Pouchink Paul", race.Sbire, 0, 0, lvl, lvl * 200);
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
    
    /** Start/End battle **/
    startBattle() {
        this.stateGame = StateGame.current;
        if (this.opponent.id==0)
            this.opponentAttack();
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
    
    /** ATTAQUE **/
    onAttack(spell: number) {
        if (this.stateGame == StateGame.current) 
        {
            if(this.attacksPercentages[spell] == 0) 
            {
                this.spellCall = this.hero.race.spells[spell];
                let power = this.hero.race.spells[spell].effect * this.hero.level;
                let coolDown;
                switch (this.spellCall.type) {
                    case (Spell.SpellType.attack):{
                        if (this.spellCall.name=="Fourbeur" && this.stateBattle != StateBattle.hide)
                            return;
                        if (this.stateBattle == StateBattle.boost)
                            power *= this.spellCall.ratio;
                        this.opponentLoseLife(Math.floor((Math.random() * power) + power + 1));
                        coolDown = this.spellCall.cooldown;
                        break; 
                    }
                    case (Spell.SpellType.boost):{
                        this.stateBattle = StateBattle.boost;
                        coolDown = this.spellCall.effect;
                        break; 
                    }
                    case (Spell.SpellType.freeze):{
                        this.stateBattle = StateBattle.freezeIn;
                        coolDown = this.spellCall.effect;
                        break; 
                    }
                    case (Spell.SpellType.shield):{
                        this.stateBattle = StateBattle.shield;
                        coolDown = this.spellCall.effect;
                        break; 
                    }
                    case (Spell.SpellType.hide):{
                        this.stateBattle = StateBattle.hide;
                        coolDown = this.spellCall.effect;
                        break; 
                    }
                }
                this.coolDown(spell, coolDown * 100);
            }
        }
    }
    
    opponentAttack() {
        this.clearTimer(3);
        let interval = Math.floor((Math.random() * 1000) + 2000 + 1);
        this.intervals[3] = window.setInterval(() => {
            let power = 5 * this.opponent.level;
            if (this.stateBattle != StateBattle.freezeIn)
                this.heroLoseLife(Math.floor((Math.random() * power) + power + 1));
        }, interval);
    }
    
    /** Heroes Life **/
    private opponentLoseLife(lifeLose: number) {
        if (this.stateBattle == StateBattle.hide && this.spellCall.name=="Fourbeur"){
            this.opponentAttack();
        }
        
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
        if (this.stateBattle == StateBattle.hide && (Math.random()*100)>50)
            return;
        
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
        console.log("Attack " + attack + " launch for " + time + "ms");
        this.clearTimer(attack);
        if (this.stateBattle != StateBattle.none && this.hero.race.spells[attack].type != Spell.SpellType.attack) 
            this.attacksPercentages[attack] = 1;
        else
            this.attacksPercentages[attack] = 100;
        let interval = 100 / (time / 200);
        this.intervals[attack] = window.setInterval(() => {
            this.intervalAnimation(attack, interval);
        }, 200);
    }
    
    private intervalAnimation(attack: number, interval: number) {
        if (this.stateBattle != StateBattle.none && this.hero.race.spells[attack].type != Spell.SpellType.attack) {
            this.attacksPercentages[attack] += interval;
            if(this.attacksPercentages[attack] >= 100) {
                this.attacksPercentages[attack] = 0;
                this.clearTimer(attack);
                this.stateBattle = StateBattle.none;
                this.coolDown(attack, this.hero.race.spells[attack].cooldown * 100);
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
