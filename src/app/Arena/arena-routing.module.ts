import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArenaComponent }       from './arena.component';
import { ArenaHomeComponent }   from './arena-home.component';

const arenaRoutes: Routes = [
    { 
        path: '',
        component: ArenaComponent,
        children: [
            { path: '', redirectTo: 'arena-door' },
            { path: 'arena-door', component: ArenaHomeComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(arenaRoutes) ],
    exports: [ RouterModule ]
})

export class ArenaRoutingModule {}
