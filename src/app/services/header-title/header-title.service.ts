import { Injectable } from '@angular/core';
import { BehaviorSubject, Head } from 'rxjs';
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

  currentItemHeader(): HeaderData {
    const path = this.getPath();

    return this._headerList.find(( headerData: HeaderData ) => {
      return headerData.link == path
    }) ?? this._headerList[0];
  }

  getPath(): string {
    const url  = this.location.path() || '/home';
    const path = '/' + url.split('/')[1];

    return path;
  }

  update(): void {
    const currentHeaderData = this.currentItemHeader();
    this.headerData = currentHeaderData;
  }

  get headerData(): HeaderData {
    return this._headerData.value;
  }

  set headerData(headerData: HeaderData) {
    this._headerData.next(headerData);
  }

  get headerList(): HeaderData[] {
    return this._headerList;
  }
}
