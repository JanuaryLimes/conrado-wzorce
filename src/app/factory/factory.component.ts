import { MsgService } from './../comunication/comunication.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss', '../app.component.scss']
})
export class FactoryComponent implements OnInit {
  public msgService: MsgService;
  public constructor() {
    this.msgService = new MsgService();

    const wloska = new WloskaPizzeria(this.msgService);
    const amerykanska = new AmerykanskaPizzeria(this.msgService);

    let pizza = wloska.zamowPizza(RodzajPizzy.serowa);
    this.msgService.WriteLine('Eryk zamowil: ' + pizza.pobierzNazwe());
    this.msgService.WriteLine();
    pizza = amerykanska.zamowPizza(RodzajPizzy.serowa);
    this.msgService.WriteLine('Jacek zamowil: ' + pizza.pobierzNazwe());
  }

  public ngOnInit() {}
}

enum RodzajPizzy {
  serowa
}

abstract class Pizzeria {
  public zamowPizza(typ: RodzajPizzy): Pizza {
    const pizza = this.utworzPizza(typ);

    pizza.przygotowanie();
    pizza.pieczenie();
    pizza.krojenie();
    pizza.pakowanie();

    return pizza;
  }

  public abstract utworzPizza(typ: RodzajPizzy): Pizza;
}

class WloskaPizzeria extends Pizzeria {
  public constructor(private msgService: MsgService) {
    super();
  }
  public utworzPizza(typ: RodzajPizzy): Pizza {
    switch (typ) {
      case RodzajPizzy.serowa:
        return new WloskaPizzaSerowa(this.msgService);
      default:
        return null;
    }
  }
}

class AmerykanskaPizzeria extends Pizzeria {
  public constructor(private msgService: MsgService) {
    super();
  }
  public utworzPizza(typ: RodzajPizzy): Pizza {
    switch (typ) {
      case RodzajPizzy.serowa:
        return new AmerykanskaPizzaSerowa(this.msgService);
      default:
        return null;
    }
  }
}

abstract class Pizza {
  protected nazwa: string;
  protected ciasto: string;
  protected sos: string;
  protected dodatki = new Array<string>();

  public constructor(private msgService: MsgService) {}

  public przygotowanie() {
    this.msgService.WriteLine('Przygotowywanie: ' + this.nazwa);
    this.msgService.WriteLine('Wyrabianie ciasta...');
    this.msgService.WriteLine('Dodawanie sosu...');
    this.msgService.WriteLine('Dodatki...');
    this.dodatki.forEach(element => {
      this.msgService.WriteLine('\t' + element);
    });
  }
  public pieczenie() {
    this.msgService.WriteLine(
      'Pieczenie: 25 minut w temperaturze 350 stopni Celsjusza'
    );
  }
  public krojenie() {
    this.msgService.WriteLine('Krojenie pizzy na 8 kawalkow');
  }
  public pakowanie() {
    this.msgService.WriteLine(
      'Pakowanie pizzy w oficjalne pudelko naszej sieci Pizzerii.'
    );
  }
  public pobierzNazwe(): string {
    return this.nazwa;
  }
}

class WloskaPizzaSerowa extends Pizza {
  public constructor(msgService: MsgService) {
    super(msgService);
    this.nazwa = 'Wloska pizza serowa z sosem Marinara';
    this.ciasto = 'Cienkie kruche ciasto';
    this.sos = 'Sos Marinara';

    this.dodatki.push('Tarty ser Reggiano');
  }
}

class AmerykanskaPizzaSerowa extends Pizza {
  public constructor(msgService: MsgService) {
    super(msgService);
    this.nazwa = 'Amerykanska Pizza Serowa';
    this.ciasto = 'Extra grube, chrupkie ciasto';
    this.sos = 'Sos z pomidorow sliwkowych';

    this.dodatki.push('Grubo tarty ser Mozzarella');
  }
}
