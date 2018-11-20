import { Component, OnInit } from '@angular/core';
import { MsgService } from '../comunication/comunication.module';

@Component({
  selector: 'app-proxy',
  templateUrl: './proxy.component.html',
  styleUrls: ['./proxy.component.scss', '../app.component.scss']
})
export class ProxyComponent implements OnInit {
  public static msgService = new MsgService();
  public classReference = ProxyComponent;

  public constructor() {
    const ms = this.classReference.msgService;
    ms.WriteLine('Operacje math proxy: ');

    const proxy = new MathProxy();
    ms.WriteLine('4 + 2 = ' + proxy.add(4, 2));
    ms.WriteLine('4 - 2 = ' + proxy.sub(4, 2));
    ms.WriteLine('4 * 2 = ' + proxy.mul(4, 2));
    ms.WriteLine('4 / 2 = ' + proxy.div(4, 2));
  }

  public ngOnInit() {}
}

interface IMath {
  add(x: number, y: number): number;
  sub(x: number, y: number): number;
  mul(x: number, y: number): number;
  div(x: number, y: number): number;
}

class Math implements IMath {
  public add(x: number, y: number) {
    return x + y;
  }
  public sub(x: number, y: number) {
    return x - y;
  }
  public mul(x: number, y: number) {
    return x * y;
  }
  public div(x: number, y: number) {
    return x / y;
  }
}

class MathProxy implements IMath {
  private math: Math;

  private getMath(): Math {
    if (!this.math) {
      this.math = new Math();
    }
    return this.math;
  }

  public constructor() {}

  public add(x: number, y: number) {
    return this.getMath().add(x, y);
  }
  public sub(x: number, y: number) {
    return this.getMath().sub(x, y);
  }
  public mul(x: number, y: number) {
    return this.getMath().mul(x, y);
  }
  public div(x: number, y: number) {
    return this.getMath().div(x, y);
  }
}
