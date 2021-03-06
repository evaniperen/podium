/*
 * Copyright (c) 2017. The Hyve and respective contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * See the file LICENSE in the root of this repository.
 *
 */
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, ValidatorFn, Validator, FormControl } from '@angular/forms';

@Directive({
    selector: '[pdmWordLengthValidator][ngModel]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: WordLengthValidatorDirective, multi: true}
    ]
})

export class WordLengthValidatorDirective implements Validator {
    validator: ValidatorFn;

    @Input() pdmWordLengthValidator: number;

   constructor() {
    }

    validate(c: FormControl) {
       if (!c.value || c.value.split(' ').length <= this.pdmWordLengthValidator) {
            return null;
       } else {
           return {
               pdmWordLengthValidator: {
                   valid: false
               }
           };
       }
    }

}
