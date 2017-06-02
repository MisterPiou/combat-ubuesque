import {Component} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ErrorService }     from '../Global/error.service';
import { UserService }      from './user.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent  
{
    userForm: FormGroup;
    response: string;
    etatMsgBox = 'errMsg';
    
    constructor(
        private fb: FormBuilder,
        private errorService: ErrorService,
        private userService: UserService ) {
            this.createForm();
        }
    
    /* Cree le formualaire */
    createForm() {
        this.userForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', Validators.email],
            first: ['', Validators.required],
            second: ['', Validators.required],
        })
    }
    
    /* Efface le formaulaire */
    resetForm() {
        this.userForm.reset();
    }
    
    /* Envoie du formualaire d'inscription */
    onSubmit() {
        const formModel = this.userForm.value;
        
        const data = {
            username: formModel.username as string,
            email: formModel.email as string,
            plainPassword: {
                first: formModel.first as string,
                second: formModel.second as string
            }
        };
        
        this.userService.registerUser(data)
            .subscribe(
                response => this.response = response,
                error => this.errorService.newErrorMessage(error.message));
                
        if (this.response) {
            this.resetForm();
            this.activeSuccesMessage()
        }
    }
    
    /* Animation message succes */
    activeSuccesMessage() {
        this.etatMsgBox = 'errMsgActive';
    }
}

