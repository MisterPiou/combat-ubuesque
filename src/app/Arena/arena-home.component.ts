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
    
    onTraining() {
        this.router.navigate(['arena/training']);
    }
    
    onVersus() {
        this.router.navigate(['arena/waiting-room']);
    }   
}