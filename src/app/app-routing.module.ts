import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroComponent }      from './Hero/hero.component';
import { HomeComponent }      from './Global/home.component';

import {RegistrationComponent}  from './User/registration.component';
import {LoginComponent}         from './User/login.component';
import {AccountComponent}         from './User/account.component';

import {ArenaRoutingModule} from './Arena/arena-routing.module';

import {AuthGuard} from './Global/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',       component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'hero',       component: HeroComponent, canActivate: [AuthGuard] },
  { path: 'account',    component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'register',   component: RegistrationComponent },
  { path: 'login',      component: LoginComponent },
  { 
    path: 'arena', 
    loadChildren: 'app/Arena/arena.module#ArenaModule',
    data: { preload: true },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}