import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArenaComponent }       from './arena.component';
import { ArenaHomeComponent }   from './arena-home.component';
import { BattleComponent }      from './battle.component';

const arenaRoutes: Routes = [
    { 
        path: '',
        component: ArenaComponent,
        children: [
            { path: '', redirectTo: 'arena-door' },
            { path: 'arena-door', component: ArenaHomeComponent },
            { path: 'battle/:id', component: BattleComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(arenaRoutes) ],
    exports: [ RouterModule ]
})

export class ArenaRoutingModule {}
