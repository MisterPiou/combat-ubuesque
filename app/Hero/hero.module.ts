import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { FormsModule,ReactiveFormsModule }  from '@angular/forms';

import { HeroComponent }       from './hero.component';
import { HeroHomeComponent }   from './hero-home.component';
import { HeroCardComponent }   from './hero-card.component';

import { HeroRoutingModule } from './hero-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HeroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HeroComponent,
    HeroHomeComponent,
    HeroCardComponent,
  ]
})
export class HeroModule {}

