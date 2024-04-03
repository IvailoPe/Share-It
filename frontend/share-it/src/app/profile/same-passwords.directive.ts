import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appSamePasswords]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SamePasswordsDirective,
      multi: true,
    },
  ],
})
export class SamePasswordsDirective implements Validator{
  constructor() {}
  validate(control: AbstractControl<any, any>): ValidationErrors | null {


    const password = control.get("password")?.value;
    const rePassword = control.get("rePassword")?.value;
    
    if(password !== rePassword){
      
      return {
        error:"Passwords dont match"
      }
    }
    return null;
  }
}
