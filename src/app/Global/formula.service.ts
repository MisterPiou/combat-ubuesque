import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class FormulaService 
{    
    calculateLifeMax(level: number): number {
        return ((level * 10)+90);
    }    
    
    calculateXpNeed(level: number): number {
        return ( Math.pow(level,2) * ( 100 + Math.pow(level,2) ) );
    }  
    
    calculateXpVictory(lvlHero: number, lvlOpponent: number): number {
        return ( (lvlHero * lvlOpponent) * 10 );
    }
    
    calculateXpDefeat(lvlHero: number, lvlOpponent: number): number {
        return ( (lvlHero * lvlOpponent) * 1 );
    }
}
