import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountInWordsPipe } from "src/assets/pipes/amount-in-words.pipe";



@NgModule({
  declarations: [AmountInWordsPipe],
  exports: [
    AmountInWordsPipe,
  ],
  imports: [
    CommonModule
  ]
})
export class AmountInWords { }
export { AmountInWordsPipe };

