import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

@Component({
  selector: 'versus',
  templateUrl: './versus.component.html',
})
export class VersusComponent 
{
    constructor(
        private router: Router
    ) {}
    
    onVersusAgainst(id: number) {
        this.router.navigate(['arena/battle/', id]);
    }   
}
