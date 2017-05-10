import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HeroComponent }  from './Hero/hero.component';

@NgModule({
  imports: [ 
    BrowserModule 
  ],
  declarations: [ 
    AppComponent,
    HeroComponent
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
