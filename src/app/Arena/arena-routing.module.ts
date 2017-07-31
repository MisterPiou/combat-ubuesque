import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArenaComponent }       from './arena.component';
import { ArenaHomeComponent }   from './arena-home.component';
import { TrainingComponent }    from './training.component';
import { VersusComponent }    from './versus.component';
import { BattleComponent }      from './battle.component';
import {WaitingRoomComponent }      from './waiting-room.component';

const arenaRoutes: Routes = [
    { 
        path: '',
        component: ArenaComponent,
        children: [
            { path: '', redirectTo: 'arena-door' },
            { path: 'arena-door', component: ArenaHomeComponent },
            { path: 'training', component: TrainingComponent },
            { path: 'versus', component: VersusComponent },
            { path: 'waiting-room', component: WaitingRoomComponent },
            { path: 'battle/:id/:lvl', component: BattleComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(arenaRoutes) ],
    exports: [ RouterModule ]
})

export class ArenaRoutingModule {}
