import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ComponentFactoryResolver
} from '@angular/core';
import { InBtnDirective } from './in-btn.directive';
import { InButtonComponent, MyData } from './in-button/in-button.component';

@Component({
  selector: 'app-template-method-element',
  templateUrl: './template-method-element.component.html',
  styleUrls: [
    './template-method-element.component.scss',
    '../../app.component.scss'
  ]
})
export class TemplateMethodElementComponent implements OnInit {
  private newItem: MsgItem;

  @Input()
  public msgItem: MsgItem;

  @Input()
  public msgService: ExtendedMsgService;

  @ViewChild(InBtnDirective)
  public inBtn: InBtnDirective;

  public constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  public ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      InButtonComponent
    );
    if (this.msgItem.yesButton) {
      const c1 = this.inBtn.viewContainerRef.createComponent(componentFactory);
      const newComp = c1.instance as MyData;
      newComp.data = 'tak';
      newComp.callback = this.dodaj.bind(this);
    }
    if (this.msgItem.noButton) {
      const c2 = this.inBtn.viewContainerRef.createComponent(componentFactory);
      const newComp = c2.instance as MyData;
      newComp.data = 'nie';
      newComp.callback = this.usun.bind(this);
    }
  }

  private dodaj() {
    if (!this.newItem) {
      const index = this.msgService.output.indexOf(this.msgItem, 0);
      this.newItem = new MsgItem('Dodaje dodatki (wersja uproszczona)');
      this.msgService.output.splice(index + 1, 0, this.newItem);
    }
  }

  private usun() {
    if (this.newItem) {
      const index = this.msgService.output.indexOf(this.newItem, 0);
      this.msgService.output.splice(index, 1);
      this.newItem = undefined;
    }
  }
}

export class ExtendedMsgService {
  public output = new Array<MsgItem>();

  public WriteLine(
    value: string = '\n',
    y: boolean = false,
    n: boolean = false
  ) {
    this.output.push(new MsgItem(value, y, n));
  }
}

class MsgItem {
  public message: string;
  public yesButton: boolean;
  public noButton: boolean;

  public constructor(message: string, y: boolean = false, n: boolean = false) {
    this.message = message;
    this.yesButton = y;
    this.noButton = n;
  }
}
