import {Component}  from '@angular/core';
import {Router}     from '@angular/router';

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
    isLoading = false;
    
    constructor(
        private fb: FormBuilder,
        private errorService: ErrorService,
        private userService: UserService,
        private router: Router ) {
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
        this.isLoading = true;
        const formModel = this.logForm.value;
        
        const data = {
            username: formModel.username,
            password: formModel.password,
        };
        
        this.userService.loginUser(data)
            .subscribe(
                response => {
                    localStorage.setItem('token', response.token);
                    this.redirectAfterLog();
                    this.isLoading = false;
                    this.loadUserInfo();
                },
                error => this.errorService.newErrorMessage(error));
    }
    
    loadUserInfo() {
        this.userService.infosUser()
            .subscribe(
                user => this.userService.userInfo = user,
                error => this.errorService.newErrorMessage(error));
    }
    
    redirectAfterLog() {
        this.router.navigate(['home']);
    }
}
