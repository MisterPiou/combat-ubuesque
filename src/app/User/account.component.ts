import {Component,OnInit} from '@angular/core';

import { ErrorService }     from '../Global/error.service';
import { UserService, User }      from './user.service';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {matchPasswordValidator} from '../Global/match-password.directive';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
})

export class AccountComponent implements OnInit
{
    user = new User(0,"", "",0,new Date());
    changeMailForm: FormGroup;
    changePwdForm: FormGroup;
    isChangeMail: boolean = false;
    isChangePwd: boolean = false;
    
    constructor(
        private errorService: ErrorService,
        private fb: FormBuilder,
        private userService: UserService ) 
    { 
        this.createForm();
    }
        
    createForm() {
        this.changeMailForm = this.fb.group({
            email: [this.user.email, [Validators.email, Validators.required]]
        });
        
        this.changePwdForm = this.fb.group({
            oldPwd: ['', [Validators.required, Validators.minLength(6)]],
            newPwd: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$")]],
            confirmPwd: ['', [Validators.required, Validators.minLength(6)]],
        }, matchPasswordValidator);
    }
        
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
    
    /**
     * Mail modification
     */
    changeMail() {
        this.isChangeMail = true;
    }
    saveNewMail() {
        const formModel = this.changeMailForm.value;
        
        this.userService.changeMail(formModel.email as string)
            .subscribe(
                user => {
                    this.user = user;
                    this.userService.setUser(this.user);
                    this.isChangeMail = false;
                    this.getUser();
                },
                error => this.errorService.newErrorMessage(error));
    }
    
    /**
     * Password modification
     */
    changePassword() {
        this.isChangePwd = true;
    }
    saveNewPassword() {
        const formModel = this.changePwdForm.value;
        
        this.userService.changePassword(formModel.newPwd as string)
            .subscribe(
                user => {
                    this.user = user;
                    this.userService.setUser(this.user);
                    this.isChangePwd = false;
                },
                error => this.errorService.newErrorMessage(error));
    }
    
    /** ng Init **/
    ngOnInit(): void {
        this.getUser();
    }
}
