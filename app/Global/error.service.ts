import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ErrorService 
{
    private erreurMessage = new Subject<string>();
    
    errorMessage$ = this.erreurMessage.asObservable();
    
    newErrorMessage(message: string) {
      this.erreurMessage.next(message);
    }
}
