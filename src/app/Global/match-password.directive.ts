import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormGroup } from '@angular/forms';

    
export function matchPasswordValidator(g: FormGroup) {
    return g.get('first').value === g.get('second').value ? null : {'erreur': 'les mots de passes sont différents'};
}

@Directive({
  selector: '[matchPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: MatchPasswordValidatorDirective, multi: true}]
})
export class MatchPasswordValidatorDirective implements Validator {
  @Input() matchPassword: string;

  validate(g: FormGroup): {[key: string]: any} {
      return this.matchPassword ? matchPasswordValidator(g) : null;
  }
}