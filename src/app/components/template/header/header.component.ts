import { Component, OnInit } from '@angular/core';

import { ThemeService } from '@services/theme/theme.service';
import { HeaderData } from '@services/header-title/header-data.model';
import { HeaderTitleService } from '@services/header-title/header-title.service';
import { ThemeTitle } from '@services/theme/theme.model';

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
    const theme = this.isDark() ? 'light' : 'dark' ;
    this.themeService.toggleTheme(theme);
  }

  isDark() {
    return this.themeService.theme === 'dark';
  }

  get headerData(): HeaderData {
    return this.headerTitleService.headerData
  }

}
