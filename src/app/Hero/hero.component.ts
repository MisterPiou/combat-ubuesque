import { Component } from '@angular/core';

import { Hero } from './hero';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.ts',
})
export class HeroComponent  { 
    myHeroes: Hero[];
}
