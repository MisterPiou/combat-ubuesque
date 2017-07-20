import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroComponent }       from './hero.component';
import { HeroHomeComponent }   from './hero-home.component';
import { HeroCardComponent }   from './hero-card.component';

const heroRoutes: Routes = [
    { 
        path: '',
        component: HeroHomeComponent,
        children: [
            { path: '', redirectTo: 'heroes' },
            { path: 'heroes', component: HeroComponent },
            { path: 'card/:id', component: HeroCardComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(heroRoutes) ],
    exports: [ RouterModule ]
})

export class HeroRoutingModule {}

