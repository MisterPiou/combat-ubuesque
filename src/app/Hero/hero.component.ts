import { Component } from '@angular/core';

import { Hero } from './hero';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent  { 
    myHeroes: Hero[];
}
