import { Directive, ElementRef, HostListener} from '@angular/core';
import {  NgControl, NgModel } from '@angular/forms';

@Directive({
    selector: '[onlyNumber]',
    providers: [NgModel]
})
export class OnlyNumberDirective  {
    constructor(private el: ElementRef,private control : NgControl, private ngModel: NgModel) {
    }  
    @HostListener('input', ['$event']) onChange($event: any) {

        const initialValue = this.el.nativeElement.value;
    
        const newValue = initialValue.replace(/[^0-9]*/g, '');

        if ( initialValue !== newValue) {

            $event.stopPropagation();
            this.control.control.setValue(newValue)
            this.control.control.setErrors({'err': 'only numbers allowed'});
            this.ngModel.control.setErrors({'err': 'only numbers allowed'});
        }
      }
}