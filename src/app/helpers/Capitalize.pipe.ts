import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const firstLetterUpperCase = value.charAt(0).toUpperCase();
    const remainderLowerCase = value.slice(1).toLowerCase();

    return firstLetterUpperCase + remainderLowerCase;
  }

}
