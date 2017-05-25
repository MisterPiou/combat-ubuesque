import { Component } from '@angular/core';

import {ErrorService}   from './Global/error.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent  
{  
    errorMessage: string;
    subscription: Subscription;
    
    constructor(private errorService: ErrorService) {
        this.subscription = errorService.errorMessage$.subscribe(
            errorMessage => {
                this.errorMessage = errorMessage;
            });
    }
    
    onErrMess(mess: string) {
        this.errorMessage = mess;
    }
}
