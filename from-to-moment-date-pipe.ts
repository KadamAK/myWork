import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';

@Pipe({
  name: 'fromToendDate'
})
export class FromToendDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(value).format('Do MMM YYYY');
  }

}
