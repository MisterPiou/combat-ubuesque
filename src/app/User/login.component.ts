import {Component} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ErrorService }     from '../Global/error.service';
import { UserService }      from './user.service';

@Component({
  selector: 'registration',
  templateUrl: './login.component.html',
})
export class LoginComponent  
{
    logForm: FormGroup;
    response: string;
    
    constructor(
        private fb: FormBuilder,
        private errorService: ErrorService,
        private userService: UserService ) {
            this.createForm();
        }
    
    /* Cree le formualaire */
    createForm() {
        this.logForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        })
    }
    
    /* Envoie du formualaire d'inscription */
    onSubmit() {
        const formModel = this.logForm.value;
        
        const data = {
            userName: formModel.username,
            password: formModel.password,
        };
        
        this.userService.loginUser(data)
            .subscribe(
                response => this.response = response,
                error => this.errorService.newErrorMessage(error.message));
                
        if (this.response) {
            this.logForm.reset();
        }
    }
}
