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
    isLoading = false;
    etatMsgBox = 'errMsg';
    
    constructor(
        private fb: FormBuilder,
        private errorService: ErrorService,
        private userService: UserService ) {
            this.createForm();
        }
    
    createForm() {
        this.userForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(4)]],
            email: ['', [Validators.email, Validators.required]],
            first: ['', [Validators.required, Validators.minLength(6)]],
            second: ['', [Validators.required, Validators.minLength(6)]],
        });
    }
    
    resetForm() {
        this.userForm.reset();
    }
    
    onSubmit() {
        const formModel = this.userForm.value;
        this.isLoading = true;
        
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
                response => {
                    this.response = response;
                    if (this.response) {
                        this.resetForm();
                        this.activeSuccesMessage();
                    }
                    this.isLoading = false;
                },
                error => this.errorService.newErrorMessage(error.message));
    }
    
    /* Animation message success */
    activeSuccesMessage() {
        this.etatMsgBox = 'errMsgActive';
    }
}

