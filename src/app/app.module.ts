import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule }  from '@angular/forms';
import { HttpModule, JsonpModule }          from '@angular/http';

import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeroComponent }    from './Hero/hero.component';
import { HomeComponent }    from './Global/home.component';

import { RegistrationComponent }    from './User/registration.component';

import { HeroService }  from './Hero/hero.service';
import { ErrorService }  from './Global/error.service';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
  ],
  declarations: [ 
    AppComponent,
    HeroComponent,
    HomeComponent,
    RegistrationComponent
  ],
  providers: [
      HeroService,
      ErrorService,
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
