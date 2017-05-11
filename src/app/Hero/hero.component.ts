import { Component } from '@angular/core';

import { Hero } from './hero';
import { Race, RACES } from './race';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent  { 
    heroes: Hero[] = [];
    races = RACES;
    model = new Hero(1, 1, "Jean-Louis", 1, 0, 0, 1, 100);
    
    onSubmit() {
        this.heroes.push(this.model);
        this.model = new Hero(1, 1, "Jean-Louis", 1, 0, 0, 1, 100);
    }
}
