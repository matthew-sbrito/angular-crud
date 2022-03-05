import { SharedService } from '@layout/auth/shared.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private shared: SharedService) {
    this.shared.titleShared = 'Cadastrar-se!';
  }

  ngOnInit() {}
}
