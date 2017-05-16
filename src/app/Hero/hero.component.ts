import { Component, OnInit } from '@angular/core';

import { Hero }         from './hero';
import { HeroService }   from './hero.service';
import { Race, RACES }  from './race';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit  { 
    defaultName = "Mon Héros";
    heroes: Hero[];
    isSubmitted = false;
    model = new Hero(1, 1, this.defaultName, 1, 0, 0, 1, 100);
    races = RACES;
    selectedHero: Hero;
    
    constructor(
        private heroService: HeroService
    ) { }
    
    getHeroes(): void {
        this.heroService
            .getHeroes()
            .then(heroes => this.heroes = heroes);
    }
    
    onSubmit() {
        this.heroes.push(this.model);
        this.model = new Hero(1, 1, this.defaultName, 1, 0, 0, 1, 100);
        $('#myModal').modal('hide');
    }
    
    newHero() {
        this.model = new Hero(1, 1, this.defaultName, 1, 0, 0, 1, 100);
    }
    
    ngOnInit(): void {
        this.getHeroes();
    }
    
    selectHero(hero: Hero) {
        this.selectedHero = hero;
    }
}
