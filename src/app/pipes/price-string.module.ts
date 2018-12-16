import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceStringPipe } from './price-string.pipe';

@NgModule({
  declarations: [PriceStringPipe],
  imports: [CommonModule],
  exports: [PriceStringPipe]
})
export class PriceStringModule { }
