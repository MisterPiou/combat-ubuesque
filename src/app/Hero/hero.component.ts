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
    errorMessage: string;
    heroes: Hero[];
    isSubmitted = false;
    lifePercentage = 0;
    model = new Hero(1, 1, this.defaultName, 1, 0, 0, 1, 100);
    races = RACES;
    selectedHero: Hero;
    xpPercentage = 0;
    
    constructor(
        private heroService: HeroService
    ) { }
    
    /** Display all heroes **/
    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(
                heroes => this.heroes = heroes,
                error =>  this.errorMessage = <any>error);
    }
    
    /** Submit form to add new hero **/
    onSubmit() {
        this.addHero(this.model.name, this.model.race);
        this.newHero();
        $('#myModal').modal('hide');
    }
    
    /** Function to add hero in symfony **/
    addHero(name: string, race: number) {
        this.heroService.addHero(name, race)
            .subscribe(
                hero => this.heroes.push(hero),
                error =>  this.errorMessage = <any>error);
    }
    
    /** Reset add hero forms **/
    newHero() {
        this.model = new Hero(1, 1, this.defaultName, 1, 0, 0, 1, 100);
    }
    
    /** When user select a hero on list **/
    selectHero(hero: Hero) {
        this.selectedHero = hero;
        this.xpPercentage = ( hero.xp / (hero.level * 10) ) * 100;
        this.lifePercentage = ( hero.life / ((hero.level * 5)+95) ) * 100;
    }
    
    /** Voir le hero **/
    viewHero() {
        
    }
    
    /** Supprime le hero **/
    deleteHero() {
        
    }
    
    /** ng Init **/
    ngOnInit(): void {
        this.getHeroes();
    }
}
