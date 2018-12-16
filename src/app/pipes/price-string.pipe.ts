import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceString'
})
export class PriceStringPipe implements PipeTransform {

  transform(value: string): string {
    return parseFloat(value).toString();
  }

}
