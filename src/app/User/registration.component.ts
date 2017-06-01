import {Component} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ErrorService }     from '../Global/error.service';
import { HeroService }      from '../Hero/hero.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent  
{
    userForm: FormGroup;
    
    constructor(
        private fb: FormBuilder,
        private heroService: HeroService ) {
            this.createForm();
        }
    
    createForm() {
        this.userForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', Validators.email],
            first: ['', Validators.required],
            second: ['', Validators.required],
        })
    }
}

