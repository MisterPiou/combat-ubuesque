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
    opponent: Hero;
    
    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService
    ) {}
    
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if(+params['id']==0) {
                this.opponent = new Hero(0, 0, "Pouchink Paul", 0, 0, 0, 1, 100);
            }
        });
    }
}
