import {
  Component, ComponentFactoryResolver,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { AuthService } from '@auth/auth.service';
import { ThemeService } from '@services/theme/theme.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('innerComponent') innerComponent?: ElementRef<Component>;
  title: string = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const { token } = this.authService.getAuthStateData();

    if(token) this.router.navigate(['/']);

    this.setParamsRoute();
  }


  setParamsRoute() {
    const data = this.route.snapshot.data;
    const component = data['innerComponent'];

    this.title = data['title'] || '';

    if(component && this.innerComponent){
      console.log(this.innerComponent.nativeElement)
      console.log(component)
    }
  }

}
