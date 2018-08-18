import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class ComunicationModule {}

export class MsgService {
  public output = new Array<string>();

  public WriteLine(value: string = '') {
    this.output.push(value);
  }
}
