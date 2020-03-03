import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'thirty-for-thirty-progress-tracker-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() items;
  @Input() item;
  @Output() selectItem = new EventEmitter();

  constructor() {}


  navToUrl(url) {
    window.location.replace(url);
  }
}
