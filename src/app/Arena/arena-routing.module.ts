import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArenaComponent } from './arena.component';

const arenaRoutes: Routes = [
    { 
        path: '',
        component: ArenaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(arenaRoutes) ],
    exports: [ RouterModule ]
})

export class ArenaRoutingModule {}
