import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedService } from '@layout/auth/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private shared: SharedService
  ) {
    this.shared.titleShared = 'Entrar';
  }

  ngOnInit() { }

}
