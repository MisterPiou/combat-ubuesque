import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ArenaComponent }   from './arena.component';
import { ArenaHomeComponent }   from './arena-home.component';

import { ArenaRoutingModule } from './arena-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ArenaRoutingModule
  ],
  declarations: [
    ArenaComponent,
    ArenaHomeComponent
  ]
})
export class ArenaModule {}
