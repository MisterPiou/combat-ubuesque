import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Hero }         from './class/hero';
import { HeroService }  from './hero.service';
import { Race }  from './class/race';

import {ErrorService}   from '../Global/error.service';
import {FormulaService} from '../Global/formula.service';

declare var bootbox: any;

@Component({
  selector: 'hero-card',
  templateUrl: './hero-card.component.html',
})
export class HeroCardComponent implements OnInit  { 
    
    hero: Hero = new Hero(1, 1, "", null, 0, 0, 1, 100);
    lifePercentage = 0;
    races: Race[] = null;
    selectedHero: Hero;
    xpPercentage = 0;
    isLoading = false;
    
    constructor(
        private heroService: HeroService,
        private errorService: ErrorService,
        private route: ActivatedRoute,
        private router: Router,
        private formula: FormulaService,
    ) { }
    
    initCard() {
        this.xpPercentage = Math.round((this.hero.xp / this.formula.calculateXpNeed(this.hero.level) ) * 100);
        this.lifePercentage = Math.round((this.hero.life / this.formula.calculateLifeMax(this.hero.level) ) * 100);
    }
    
    /** Select the main hero **/
    mainHero() {
        this.isLoading = true;
        this.hero.state = 3;
        let state = this.hero.state;
        this.heroService.updateHero(this.hero.id, {state})
            .subscribe(
                retour => {
                    this.isLoading = false;
                    this.heroService.setHeroInfo(retour);
                },
                error => this.errorService.newErrorMessage(error));
    }
    
    /** ng Init **/
    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.heroService.getHero(parseInt(params.get('id'))))
            .subscribe(
                (hero: Hero) => {
                    this.hero = hero;
                    this.initCard();
                },
                error => this.errorService.newErrorMessage(error) );
    }
}
