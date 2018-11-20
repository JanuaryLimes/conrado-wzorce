import { MsgService } from './../comunication/comunication.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styleUrls: ['./observer.component.scss', '../app.component.scss']
})
export class ObserverComponent implements OnInit {
  public msgService: MsgService;

  public constructor() {
    this.msgService = new MsgService();

    const danePogodowe = new DanePogodowe();
    const warunkiBiezaceWyswietl = new WarunkiBiezaceWyswietl(
      danePogodowe,
      this.msgService
    );
    const statystykaWyswietl = new StatystykaWyswietl(
      danePogodowe,
      this.msgService
    );

    danePogodowe.ustawOdczyty(26.6, 65, 1013.1);
    this.msgService.WriteLine('Aktualizacja');
    danePogodowe.ustawOdczyty(27.7, 70, 997.0);
    this.msgService.WriteLine('Aktualizacja');
    danePogodowe.ustawOdczyty(25.5, 90, 997.0);
  }
  public ngOnInit() {}
}

interface Podmiot {
  zarejestrujObserwatora(o: Obserwator);
  usunObserwatora(o: Obserwator);
  powiadomObserwatorow();
}

interface Obserwator {
  aktualizacja(temp: number, wilgotnosc: number, cisnienie: number);
}

interface WyswietlElement {
  wyswietl();
}

class DanePogodowe implements Podmiot {
  private temperatura: number;
  private wilgotnosc: number;
  private cisnienie: number;
  private obserwatorzy: Array<Obserwator>;

  public constructor() {
    this.obserwatorzy = new Array<Obserwator>();
  }

  public zarejestrujObserwatora(o: Obserwator) {
    this.obserwatorzy.push(o);
  }

  public usunObserwatora(o: Obserwator) {
    const index = this.obserwatorzy.indexOf(o, 0);
    if (index > -1) {
      this.obserwatorzy.splice(index, 1);
    }
  }

  public powiadomObserwatorow() {
    this.obserwatorzy.forEach(element => {
      element.aktualizacja(this.temperatura, this.wilgotnosc, this.cisnienie);
    });
  }

  public ustawOdczyty(
    temperatura: number,
    wilgotnosc: number,
    cisnienie: number
  ) {
    this.temperatura = temperatura;
    this.wilgotnosc = wilgotnosc;
    this.cisnienie = cisnienie;

    this.powiadomObserwatorow();
  }
}

class WarunkiBiezaceWyswietl implements Obserwator, WyswietlElement {
  private msgService: MsgService;
  private temperatura: number;
  private wilgotnosc: number;
  private danePogodowe: Podmiot;

  public constructor(danePogodowe: DanePogodowe, msgService: MsgService) {
    this.danePogodowe = danePogodowe;
    this.danePogodowe.zarejestrujObserwatora(this);
    this.msgService = msgService;
  }

  public wyswietl() {
    this.msgService.WriteLine(
      `Warunki biezace ${this.temperatura} stopni C oraz ${
        this.wilgotnosc
      }% wilgotnosci`
    );
  }

  public aktualizacja(temp: number, wilgotnosc: number, cisnienie: number) {
    this.temperatura = temp;
    this.wilgotnosc = wilgotnosc;
    this.wyswietl();
  }
}

class StatystykaWyswietl implements Obserwator, WyswietlElement {
  private msgService: MsgService;
  private danePogodowe: Podmiot;
  private sumaTemperatur = 0;
  private iloscPomiarow = 0;
  private temperaturaMaksymalna = 0;
  private temperaturaMinimalna = 200;

  public constructor(danePogodowe: DanePogodowe, msgService: MsgService) {
    this.danePogodowe = danePogodowe;
    this.danePogodowe.zarejestrujObserwatora(this);
    this.msgService = msgService;
  }

  public wyswietl() {
    this.msgService.WriteLine(
      `Temperatura srednia / Maksymalna / Minimalna = ${(
        this.sumaTemperatur / this.iloscPomiarow
      ).toFixed(1)} / ${this.temperaturaMaksymalna.toFixed(
        1
      )} / ${this.temperaturaMinimalna.toFixed(1)}`
    );
  }

  public aktualizacja(temp: number, wilgotnosc: number, cisnienie: number) {
    this.sumaTemperatur += temp;
    this.iloscPomiarow++;

    if (temp > this.temperaturaMaksymalna) {
      this.temperaturaMaksymalna = temp;
    }
    if (temp < this.temperaturaMinimalna) {
      this.temperaturaMinimalna = temp;
    }

    this.wyswietl();
  }
}
