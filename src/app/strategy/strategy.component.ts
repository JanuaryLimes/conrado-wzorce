import { Component, OnInit } from '@angular/core';
import { MsgService } from '../comunication/comunication.module';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss', '../app.component.scss']
})
export class StrategyComponent implements OnInit {
  public msgService: MsgService;

  public constructor() {
    this.msgService = new MsgService();

    const kaczka = new DzikaKaczka(this.msgService);
    kaczka.wyswietl();
    kaczka.wykonajKwacz();
    kaczka.wykonajLec();

    this.msgService.WriteLine();

    const model = new ModelKaczki(this.msgService);
    model.wyswietl();
    model.wykonajKwacz();
    model.wykonajLec();
    model.ustawLatanieInterfejs(new LotZNapedemRakietowym(this.msgService));
    model.wykonajLec();
  }

  public ngOnInit() {}
}

abstract class Kaczka {
  protected msgService: MsgService;
  protected latanieInterfejs: LatanieInterfejs;
  protected kwakanieInterfejs: KwakanieInterfejs;

  protected abstract wyswietl();

  public ustawLatanieInterfejs(li: LatanieInterfejs) {
    this.latanieInterfejs = li;
  }

  public ustawKwakanieInterfejs(ki: KwakanieInterfejs) {
    this.kwakanieInterfejs = ki;
  }

  public wykonajLec() {
    this.latanieInterfejs.lec();
  }

  public wykonajKwacz() {
    this.kwakanieInterfejs.kwacz();
  }

  public plywaj() {
    this.msgService.WriteLine('wszystkie kaczki plywaja');
  }
}

interface LatanieInterfejs {
  lec();
}

interface KwakanieInterfejs {
  kwacz();
}

class DzikaKaczka extends Kaczka {
  public constructor(msgService: MsgService) {
    super();
    this.msgService = msgService;

    this.kwakanieInterfejs = new Kwacz(this.msgService);
    this.latanieInterfejs = new LatamBoMamSkrzydla(this.msgService);
  }

  public wyswietl() {
    this.msgService.WriteLine('Jestem prawdziwa Dzika Kaczka');
  }
}

class ModelKaczki extends Kaczka {
  public constructor(msgService: MsgService) {
    super();
    this.msgService = msgService;

    this.kwakanieInterfejs = new Kwacz(this.msgService);
    this.latanieInterfejs = new NieLatam(this.msgService);
  }

  public wyswietl() {
    this.msgService.WriteLine('Jestem modelem kaczki');
  }
}

class Kwacz implements KwakanieInterfejs {
  public constructor(private msgService: MsgService) {}

  public kwacz() {
    this.msgService.WriteLine('Kwa! Kwa!');
  }
}

class NieKwacz implements KwakanieInterfejs {
  public constructor(private msgService: MsgService) {}

  public kwacz() {
    this.msgService.WriteLine('<<< cisza >>>');
  }
}

class Piszcz implements KwakanieInterfejs {
  public constructor(private msgService: MsgService) {}

  public kwacz() {
    this.msgService.WriteLine('Piszcze!');
  }
}

class LatamBoMamSkrzydla implements LatanieInterfejs {
  public constructor(private msgService: MsgService) {}

  public lec() {
    this.msgService.WriteLine('O rany! Latam!');
  }
}

class NieLatam implements LatanieInterfejs {
  public constructor(private msgService: MsgService) {}

  public lec() {
    this.msgService.WriteLine('Nie umiem latac!');
  }
}

class LotZNapedemRakietowym implements LatanieInterfejs {
  public constructor(private msgService: MsgService) {}

  public lec() {
    this.msgService.WriteLine('Uuuuuaaaa! Lot z napedem rakietowym!');
  }
}
