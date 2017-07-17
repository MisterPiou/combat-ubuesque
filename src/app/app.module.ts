import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule }  from '@angular/forms';
import { Http,HttpModule,JsonpModule, RequestOptions }    from '@angular/http';

import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeroComponent }    from './Hero/hero.component';
import { HomeComponent }    from './Global/home.component';

import { RegistrationComponent }    from './User/registration.component';
import { LoginComponent }           from './User/login.component';

import { HeroService }          from './Hero/hero.service';
import { UserService }          from './User/user.service';
import { ErrorService }         from './Global/error.service';
import { AuthGuard }            from './Global/auth.guard';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp( new AuthConfig({}), http, options);
}

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
    RegistrationComponent,
    LoginComponent
  ],
  providers: [
    {
        provide: AuthHttp,
        useFactory: authHttpServiceFactory,
        deps: [ Http, RequestOptions ]
    },
      HeroService,
      UserService,
      ErrorService,
      AuthGuard,
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
