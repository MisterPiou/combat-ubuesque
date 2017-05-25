import { Component } from '@angular/core';

import { ErrorService }     from './Global/error.service';
import { Subscription }     from 'rxjs/Subscription';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent  
{  
    errorMessage: string;
    subscription: Subscription;
    etatMsgBox = 'errMsg';
    interval: any;
    
    constructor(private errorService: ErrorService) {
        this.subscription = errorService.errorMessage$.subscribe(
            errorMessage => {
                this.errorMessage = errorMessage;
                this.activeErrorMessage();
            });
    }
    
    activeErrorMessage() {
        this.etatMsgBox = 'errMsgActive';
        this.interval = setInterval(() => {this.inactiveErrorMessage(); }, 3500);
    }
    inactiveErrorMessage() {
        this.etatMsgBox = 'errMsgInactive';
        clearInterval(this.interval);
        //this.interval = setInterval(() => {this.endErrorMessage(); }, 500);
    }
    endErrorMessage() {
        this.etatMsgBox = 'errMsg';
        clearInterval(this.interval);
    }
}
