import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(rawDate: any): string {

      const date = new Date(
        rawDate[0], 
        rawDate[1] - 1, 
        rawDate[2], 
        rawDate[3],
        rawDate[4], 
        rawDate[5]
      );
      return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    
  }

}
