import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-in-button',
  templateUrl: './in-button.component.html',
  styleUrls: ['./in-button.component.scss']
})
export class InButtonComponent implements MyData {
  @Input()
  public data: any;
  public callback: () => void;

  public onClick() {
    this.callback();
  }
}

export interface MyData {
  data: any;
  callback: () => void;
}
