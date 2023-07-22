import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine'
})

/**
 * This pipe automatically splits the string by '•',
 * manually creating a bullet-list appearance.
 * To avoid invisible lines, it skips the first instance.
 */
export class NewLinePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return value.replace(/\n/g, '<br>');
    }
    return value || '';
  }
}
