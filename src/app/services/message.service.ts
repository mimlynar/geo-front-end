import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  dataSource = new BehaviorSubject<string>('');

  constructor() {
  }

  emitMessage(message: string) {
    this.dataSource.next(message);
  }

}
