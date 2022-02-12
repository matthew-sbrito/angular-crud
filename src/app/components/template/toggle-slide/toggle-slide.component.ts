import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-slide',
  templateUrl: './toggle-slide.component.html',
  styleUrls: ['./toggle-slide.component.scss']
})
export class ToggleSlideComponent implements OnInit {

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Input() checked: boolean = false;

  constructor() { }

  ngOnInit(): void { }
}
