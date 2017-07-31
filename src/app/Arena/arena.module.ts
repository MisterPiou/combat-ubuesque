import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ArenaComponent }           from './arena.component';
import { ArenaHomeComponent }       from './arena-home.component';
import {TrainingComponent }         from './training.component';
import {VersusComponent }           from './versus.component';
import { BattleComponent }          from './battle.component';
import { WaitingRoomComponent }     from './waiting-room.component';

import {ServerService} from './server.service';

import { ArenaRoutingModule } from './arena-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ArenaRoutingModule
  ],
  declarations: [
    ArenaComponent,
    ArenaHomeComponent,
    BattleComponent,
    TrainingComponent,
    VersusComponent,
    WaitingRoomComponent,
  ],
  providers: [
    ServerService,
  ],
})
export class ArenaModule {}
