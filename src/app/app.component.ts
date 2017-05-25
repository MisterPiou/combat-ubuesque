import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent  
{  
    errorMessage: string;
    
    onErrMess(mess: string) {
        this.errorMessage = mess;
    }
}
