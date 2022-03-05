import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private _titleShared = new BehaviorSubject<string>("");

  get titleShared(): string {
    return this._titleShared.value;
  }

  set titleShared(title: string) {
    this._titleShared.next(title);
  }
}
