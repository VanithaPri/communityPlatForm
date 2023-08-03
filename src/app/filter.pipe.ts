import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(data: any[], searchText: string): any[] {
    if (!searchText) return data;

    return data.filter((item) => {
      return Object.values(item).some((value) => {
        return String(value).toLowerCase().includes(searchText.toLowerCase());
      });
    });
  }
}
