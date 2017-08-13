import {Component,OnInit} from '@angular/core';

import { ErrorService }     from '../Global/error.service';
import { UserService, User }      from './user.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
})

export class AccountComponent implements OnInit
{
    user = new User(0,"",0,new Date());
    
    constructor(
        private errorService: ErrorService,
        private userService: UserService ) { }
        
    getUser(): void {
        this.user = this.userService.getUser();
        this.userService.infosUser()
            .subscribe(
                user => {
                    this.user = user;
                    this.userService.setUser(this.user);
                },
                error => this.errorService.newErrorMessage(error));
    }
    
    /** ng Init **/
    ngOnInit(): void {
        this.getUser();
    }
}
