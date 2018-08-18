import { MsgService } from './../comunication/comunication.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decorator',
  templateUrl: './decorator.component.html',
  styleUrls: ['./decorator.component.scss', '../app.component.scss']
})
export class DecoratorComponent implements OnInit {
  public msgService: MsgService;

  public constructor() {
    this.msgService = new MsgService();

    let napoj = new Espresso();
    this.msgService.WriteLine(
      `${napoj.pobierzOpis()} ${napoj.koszt().toFixed(2)} zł`
    );

    napoj = new Bezkofeinowa();
    napoj = new Mleko(napoj);
    napoj = new Czekolada(napoj);
    napoj = new MleczkoSojowe(napoj);
    napoj = new BitaSmietana(napoj);
    this.msgService.WriteLine(
      `${napoj.pobierzOpis()} ${napoj.koszt().toFixed(2)} zł`
    );

    napoj = new MocnoPalona();
    napoj = new Czekolada(napoj);
    napoj = new Czekolada(napoj);
    napoj = new BitaSmietana(napoj);
    this.msgService.WriteLine(
      `${napoj.pobierzOpis()} ${napoj.koszt().toFixed(2)} zł`
    );

    napoj = new StarCafeSpecial();
    napoj = new MleczkoSojowe(napoj);
    napoj = new Czekolada(napoj);
    napoj = new BitaSmietana(napoj);
    napoj = new Mleko(napoj);
    this.msgService.WriteLine(
      `${napoj.pobierzOpis()} ${napoj.koszt().toFixed(2)} zł`
    );
  }

  public ngOnInit() {}
}

abstract class Napoj {
  protected opis = 'Napój nieznany';

  public pobierzOpis(): string {
    return this.opis;
  }

  public abstract koszt(): number;
}

abstract class SkladnikDekorator extends Napoj {
  public abstract pobierzOpis(): string;
}

class Espresso extends Napoj {
  public constructor() {
    super();
    this.opis = 'Kawa Espresso';
  }

  public koszt(): number {
    return 1.99;
  }
}

class StarCafeSpecial extends Napoj {
  public constructor() {
    super();
    this.opis = 'Kawa Star Cafe Special';
  }

  public koszt(): number {
    return 0.89;
  }
}

class MocnoPalona extends Napoj {
  public constructor() {
    super();
    this.opis = 'Kawa Mocno Palona';
  }

  public koszt(): number {
    return 0.99;
  }
}

class Bezkofeinowa extends Napoj {
  public constructor() {
    super();
    this.opis = 'Kawa Bezkofeinowa';
  }

  public koszt(): number {
    return 1.05;
  }
}

class Czekolada extends SkladnikDekorator {
  public constructor(private napoj: Napoj) {
    super();
    this.napoj = napoj;
  }
  public pobierzOpis(): string {
    return this.napoj.pobierzOpis() + ', Czekolada';
  }
  public koszt(): number {
    return this.napoj.koszt() + 0.2;
  }
}

class Mleko extends SkladnikDekorator {
  public constructor(private napoj: Napoj) {
    super();
    this.napoj = napoj;
  }
  public pobierzOpis(): string {
    return this.napoj.pobierzOpis() + ', Mleko';
  }
  public koszt(): number {
    return this.napoj.koszt() + 0.1;
  }
}

class MleczkoSojowe extends SkladnikDekorator {
  public constructor(private napoj: Napoj) {
    super();
    this.napoj = napoj;
  }
  public pobierzOpis(): string {
    return this.napoj.pobierzOpis() + ', Mleczko sojowe';
  }
  public koszt(): number {
    return this.napoj.koszt() + 0.15;
  }
}

class BitaSmietana extends SkladnikDekorator {
  public constructor(private napoj: Napoj) {
    super();
    this.napoj = napoj;
  }
  public pobierzOpis(): string {
    return this.napoj.pobierzOpis() + ', Bita smietana';
  }
  public koszt(): number {
    return this.napoj.koszt() + 0.1;
  }
}
