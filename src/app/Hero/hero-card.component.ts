import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Hero }         from './class/hero';
import { HeroService }  from './hero.service';
import { Race, RACES }  from './class/race';

import {ErrorService} from '../Global/error.service';

declare var bootbox: any;

@Component({
  selector: 'hero-card',
  templateUrl: './hero-card.component.html',
})
export class HeroCardComponent implements OnInit  { 
    
    hero: Hero = new Hero(1, 1, "", 1, 0, 0, 1, 100);
    lifePercentage = 0;
    races = RACES;
    selectedHero: Hero;
    xpPercentage = 0;
    
    constructor(
        private heroService: HeroService,
        private errorService: ErrorService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }
    
    initCard() {
        this.xpPercentage = ( this.hero.xp / (this.hero.level * 10) ) * 100;
        this.lifePercentage = ( this.hero.life / ((this.hero.level * 5)+95) ) * 100;
    }
    
    /** Selectione le hero principal **/
    mainHero() {
        this.hero.state = 3;
        let state = this.hero.state;
        this.heroService.updateHero(this.hero.id, {state})
            .subscribe(
                retour => null,
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
