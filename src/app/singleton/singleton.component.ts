import { Component, OnInit } from '@angular/core';
import { MsgService } from '../comunication/comunication.module';

@Component({
  selector: 'app-singleton',
  templateUrl: './singleton.component.html',
  styleUrls: ['./singleton.component.scss', '../app.component.scss']
})
export class SingletonComponent implements OnInit {
  public msgService: MsgService;
  public constructor() {
    this.msgService = new MsgService();

    const instance = MySingleton.getInstance();

    this.msgService.WriteLine(instance.print());
    this.msgService.WriteLine(instance.print());
  }
  public ngOnInit() {}
}

class MySingleton {
  private static instance: MySingleton;
  private constructor() {}
  public static getInstance(): MySingleton {
    if (!this.instance) {
      this.instance = new MySingleton();
    }
    return this.instance;
  }

  public print(): string {
    return 'Wiadomość z singletona';
  }
}
