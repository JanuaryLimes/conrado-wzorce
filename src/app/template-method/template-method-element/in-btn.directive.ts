import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appInBtn]'
})
export class InBtnDirective {
  public constructor(public viewContainerRef: ViewContainerRef) {}
}
