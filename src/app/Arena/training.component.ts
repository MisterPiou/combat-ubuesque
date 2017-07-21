import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

@Component({
  selector: 'training',
  templateUrl: './training.component.html',
})
export class TrainingComponent 
{
    constructor(
        private router: Router
    ) {}
    
    onStartTraining(level: number) {
        this.router.navigate(['arena/battle/0/', level]);
    } 
}
