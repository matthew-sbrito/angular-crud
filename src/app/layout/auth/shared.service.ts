import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private router: Router) { }

  private _titleShared = new BehaviorSubject<string>("");

  get titleShared(): string {
    return this._titleShared.value;
  }

  set titleShared(title: string) {
    this._titleShared.next(title);
  }
}
