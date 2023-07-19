import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine'
})

export class NewLinePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      const lines = value.split('•');
      return lines.join('<br>•');
    }
    return '';
  }
}
