import { Component, OnInit } from '@angular/core';

import { ThemeService } from '@services/theme.service';
import { HeaderData } from '@services/header-title/header-data.model';
import { HeaderTitleService } from '@services/header-title/header-title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private headerTitleService: HeaderTitleService,
    private themeService: ThemeService
    ) { }

  ngOnInit() {
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDark() {
    return this.themeService.isDark();
  }

  get headerData(): HeaderData {
    return this.headerTitleService.headerData
  }

}
