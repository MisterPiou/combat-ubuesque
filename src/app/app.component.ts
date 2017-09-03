import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import {UserService, User} from './User/user.service';

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
    isArena = false;
    
    constructor(
        private errorService: ErrorService, 
        private userService: UserService,
        private router: Router
    ) {
        this.subscription = errorService.errorMessage.subscribe(
            errorMessage => {
                this.errorMessage = errorMessage;
                this.activeErrorMessage();
            });
            
        this.router.events.subscribe((url:any) => {
            if(url.url)
                this.isArena = url.url.includes("/arena");
        });
    }
    
    activeErrorMessage() {
        this.etatMsgBox = 'errMsgActive';
        this.interval = setInterval(() => {this.inactiveErrorMessage(); }, 3500);
    }
    inactiveErrorMessage() {
        this.etatMsgBox = 'errMsgInactive';
        clearInterval(this.interval);
        this.interval = setInterval(() => {this.endErrorMessage(); }, 450);
    }
    endErrorMessage() {
        this.etatMsgBox = 'errMsg';
        clearInterval(this.interval);
    }
    
    hasAuthToken() {
        return this.userService.loggedIn();
    }
    logout() {
        this.userService.logout();
        this.router.navigate(['login']);
    }
}
