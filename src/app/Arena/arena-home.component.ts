import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

@Component({
  selector: 'arena-home',
  templateUrl: './arena-home.component.html',
})
export class ArenaHomeComponent 
{
    constructor(
        private router: Router
    ) {}
    
    onStartTraining(level: number) {
        this.router.navigate(['arena/battle', 0]);
    }
        
}