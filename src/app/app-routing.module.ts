import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroComponent }      from './Hero/hero.component';
import { HomeComponent }      from './Global/home.component';

import {ArenaRoutingModule} from './Arena/arena-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',     component: HomeComponent },
  { path: 'hero',     component: HeroComponent },
  { 
    path: 'arena', 
    loadChildren: 'app/Arena/arena.module#ArenaModule',
    data: { preload: true }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}