import {Component} from '@angular/core';

import { ErrorService }     from '../Global/error.service';
import { UserService }      from './user.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
})

export class AccountComponent  
{
    constructor(
        private errorService: ErrorService,
        private userService: UserService ) { }
}
