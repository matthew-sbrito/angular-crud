import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderData } from '@services/header-title/header-data.model';
import { HeaderTitleService } from '@services/header-title/header-title.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  headerList: HeaderData[] = [];

  constructor(
    private headerTitleService: HeaderTitleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.headerList = this.headerTitleService.headerList;
  }

  navigate(headerData: HeaderData): void {
    this.headerTitleService.headerData = headerData;
    this.router.navigate([headerData.link]);
  }
}
