import {Component,OnInit} from '@angular/core';

import { ErrorService }     from '../Global/error.service';
import { UserService }      from './user.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
})

export class AccountComponent implements OnInit
{
    user : string[] = [];
    
    constructor(
        private errorService: ErrorService,
        private userService: UserService ) { }
        
    getUser(): void {
        this.user = this.userService.userInfo;
        this.userService.infosUser()
            .subscribe(
                user => {
                    this.user = user;
                    this.userService.userInfo = this.user;
                },
                error => this.errorService.newErrorMessage(error));
    }
    
    /** ng Init **/
    ngOnInit(): void {
        this.getUser();
    }
}
