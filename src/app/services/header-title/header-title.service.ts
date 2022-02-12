import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';

import headerList from "./factory";
import { HeaderData } from './header-data.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderTitleService {

  private _headerList: HeaderData[] = headerList;

  private _headerData = new BehaviorSubject<HeaderData>(this.currentItemHeader());

  constructor(private location: Location) { }

  get headerData(): HeaderData {
    return this._headerData.value;
  }

  currentItemHeader(): HeaderData {
    const path = this.getPath();

    return this._headerList.filter(( headerData: HeaderData ) => {
      return headerData.link == path
    })[0];
  }

  getPath(): string {
    const url  = this.location.path() || '/home';
    const path = '/' + url.split('/')[1];

    return path;
  }

  set headerData(headerData: HeaderData) {
    this._headerData.next(headerData);
  }

  get headerList(): HeaderData[] {
    return this._headerList;
  }
}
