import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { Hero }         from './class/hero';
import { HeroService }   from './hero.service';
import { Race, RACES }  from './class/race';

import {ErrorService}   from '../Global/error.service';
import {FormulaService} from '../Global/formula.service';

declare var bootbox: any;

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit  { 
    defaultName = "Mon Héros";
    heroes: Hero[];
    isSubmitted = false;
    lifePercentage = 0;
    model = new Hero(1, 1, this.defaultName, RACES[1], 0, 0, 1, 100);
    races = RACES;
    selectedHero: Hero;
    xpPercentage = 0;
    isLoading = false;
    
    constructor(
        private heroService: HeroService,
        private errorService: ErrorService,
        private router: Router,
        private formula: FormulaService,
    ) { }
    
    /** Display all heroes **/
    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(
                heroes => this.heroes = heroes,
                error => this.errorService.newErrorMessage(error));
    }
    
    /** Submit form to add new hero **/
    onSubmit() {
        this.addHero(this.model.name, this.model.race.id);
        this.newHero();
        $('#myModal').modal('hide');
    }
    
    /** Function to add hero in symfony **/
    addHero(name: string, race: number) {
        this.heroService.addHero(name, race)
            .subscribe(
                hero => this.getHeroes(),
                error => this.errorService.newErrorMessage(error));
    }
    
    /** Reset add hero forms **/
    newHero() {
        this.model = new Hero(1, 1, this.defaultName, RACES[1], 0, 0, 1, 100);
    }
    
    /** When user select a hero on list **/
    selectHero(hero: Hero) {
        this.selectedHero = hero;
        this.xpPercentage = Math.round((hero.xp / this.formula.calculateXpNeed(hero.level) ) * 100);
        this.lifePercentage = Math.round((hero.life / this.formula.calculateLifeMax(hero.level) ) * 100);
    }
    
    /** Voir le hero **/
    viewHero() {
        this.router.navigate(['/hero/card', this.selectedHero.id])
    }
    
    /** Supprime le hero **/
    deleteHero() {
        /*bootbox.confirm("Voulez-vous vraiment mettre ce héros à la porte?\n[Note: Vous risquez un discour houleux avec le SynHerGy (SYNdicat des HERos GYmnaste)]", function(result) {
            if(result) {
                this.heroService.delete(this.selectedHero.id)
                    .subscribe(
                        heroes => this.heroes = heroes,
                        error =>  this.errorMessage = <any>error);
            }
        });*/
        if(confirm("Voulez-vous vraiment mettre ce héros à la porte?\n[Note: Vous risquez un discour houleux avec le SynHerGy (SYNdicat des HERos GYmnaste)]"))
        {
            this.heroService.delete(this.selectedHero.id)
                .subscribe(
                    heroes => this.heroes = heroes,
                    error => this.errorService.newErrorMessage(error.message));
        }
    }
    
    /** Selectione le hero principal **/
    mainHero() {
        this.isLoading = true;
        this.selectedHero.state = 3;
        let state = this.selectedHero.state;
        this.heroService.updateHero(this.selectedHero.id, {state})
            .subscribe(
                retour => {
                    this.isLoading = false;
                    this.getHeroes();
                },
                error => this.errorService.newErrorMessage(error));
    }
    
    /** ng Init **/
    ngOnInit(): void {
        this.getHeroes();
    }
}
