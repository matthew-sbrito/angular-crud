import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderData } from './header-data.model';
import headerList from "./factory";
import { Location } from '@angular/common';

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
    const path = this.location.path();

    return this._headerList.filter(( headerData: HeaderData ) => {
      return headerData.link == path
    })[0];
  }

  set headerData(headerData: HeaderData) {
    this._headerData.next(headerData);
  }

  get headerList(): HeaderData[] {
    return this._headerList;
  }
}
