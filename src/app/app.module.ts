import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule, JsonpModule }  from '@angular/http';

import { AppComponent }     from './app.component';
import { HeroComponent }    from './Hero/hero.component';

import { HeroService }  from './Hero/hero.service';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
  ],
  declarations: [ 
    AppComponent,
    HeroComponent
  ],
  providers: [
      HeroService
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
