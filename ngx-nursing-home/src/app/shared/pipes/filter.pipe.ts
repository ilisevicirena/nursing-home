import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, prop?: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    const s = searchText.toLowerCase();
    return items.filter((it) => {
      if (!prop) {
        return JSON.stringify(it).toLowerCase().includes(s);
      }
      const val = it && it[prop];
      return (val || '').toString().toLowerCase().includes(s);
    });
  }
}
