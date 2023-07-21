import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine'
})

/**
 * This pipe automatically splits the string by '•',
 * manually creating a bullet-list appearance.
 */
export class NewLinePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      const lines = value.split('•');
      return lines.join('<br>•');
    }
    return '';
  }
}
