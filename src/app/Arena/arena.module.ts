import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ArenaComponent }   from './arena.component';

import {ArenaRoutingModule} from './arena-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ArenaRoutingModule
  ],
  declarations: [
    ArenaComponent,
  ]
})
export class ArenaModule {}
