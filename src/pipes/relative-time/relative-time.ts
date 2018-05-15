import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: string, ...args) {
    moment.locale('id');
    return moment(value).calendar();
    
    // return moment(value).fromNow();
  }
}
