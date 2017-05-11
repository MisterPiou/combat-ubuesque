import { Component } from '@angular/core';

import { Hero } from './hero';
import { Race, RACES } from './race';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent  { 
    heroes: Hero[] = [new Hero(1, 1, "Jean-Louis", 1, 0, 0, 1, 100)];
    defaultName = "Mon Héros";
    races = RACES;
    model = new Hero(1, 1, this.defaultName, 1, 0, 0, 1, 100);
    isSubmitted = false;
    selectedHero: Hero;
    
    onSubmit() {
        this.heroes.push(this.model);
        this.model = new Hero(1, 1, this.defaultName, 1, 0, 0, 1, 100);
        $('#myModal').modal('hide');
    }
    
    newHero() {
        this.model = new Hero(1, 1, this.defaultName, 1, 0, 0, 1, 100);
    }
    
    selectHero(hero: Hero) {
        this.selectedHero = hero;
    }
}
