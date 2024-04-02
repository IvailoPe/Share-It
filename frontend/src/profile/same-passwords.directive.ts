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

    console.log(password);
    console.log(rePassword);
    
    if(password !== rePassword){
      console.log(2);
      
      return {
        error:"Passwords dont match"
      }
    }
    console.log(1);
    return null;
  }
}
