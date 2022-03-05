import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@auth/auth.service';
import { ThemeService } from '@services/theme/theme.service';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private shared: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    const { token } = this.authService.getAuthStateData();

    if(token) this.router.navigate(['/']);
  }

  get title(): string {
    return this.shared.titleShared;
  }

}
