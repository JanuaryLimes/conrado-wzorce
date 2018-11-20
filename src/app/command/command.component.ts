import { Component, OnInit } from '@angular/core';
import { MsgService } from '../comunication/comunication.module';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss', '../app.component.scss']
})
export class CommandComponent implements OnInit {
  public static msgService = new MsgService();
  public classReference = CommandComponent;

  public constructor() {
    this.pilot();
    this.superPilot();
    this.superPilotZWycofywaniem();
  }

  private pilot(): void {
    const pilot = new MiniPilot();
    const swiatlo = new Swiatlo();
    const drzwiGarazowe = new DrzwiGarazowe();

    const wlaczSwiatlo = new PolecenieWlaczSwiatlo(swiatlo);
    const otworzDrzwiGarazowe = new PolecenieOtworzDrzwiGarazowe(drzwiGarazowe);

    pilot.ustawPolecenie(wlaczSwiatlo);
    pilot.przyciskZostalNacisniety();
    pilot.ustawPolecenie(otworzDrzwiGarazowe);
    pilot.przyciskZostalNacisniety();
  }

  private superPilot(): void {
    const superPilot = new SuperPilot();

    const jadalniaSwiatlo = new Swiatlo('Jadalnia');
    const kuchniaSwiatlo = new Swiatlo('Kuchnia');
    const wiezaStereo = new WiezaStereo();

    const jadalniaWlaczSwiatlo = new PolecenieWlaczSwiatlo(jadalniaSwiatlo);
    const jadalniaWylaczSwiatlo = new PolecenieWylaczSwiatlo(jadalniaSwiatlo);
    const kuchniaWlaczSwiatlo = new PolecenieWlaczSwiatlo(kuchniaSwiatlo);
    const kuchniaWylaczSwiato = new PolecenieWylaczSwiatlo(kuchniaSwiatlo);
    const wiezaStereoWlaczCD = new PolecenieWiezaStereoWlaczCD(wiezaStereo);
    const wylaczWiezaStereo = new PolecenieWylaczWiezaStereo(wiezaStereo);

    superPilot.ustawPolecenie(0, jadalniaWlaczSwiatlo, jadalniaWylaczSwiatlo);
    superPilot.ustawPolecenie(1, kuchniaWlaczSwiatlo, kuchniaWylaczSwiato);
    superPilot.ustawPolecenie(2, wiezaStereoWlaczCD, wylaczWiezaStereo);

    CommandComponent.msgService.WriteLine(superPilot.toString() + '\n');

    for (let i = 0; i < 7; i++) {
      superPilot.wcisnietoPrzyciskWlacz(i);
      superPilot.wcisnietoPrzyciskWylacz(i);
    }
  }

  private superPilotZWycofywaniem() {
    const superPilotZWycofywaniem = new SuperPilotZWycofywaniem();

    const jadalniaSwiatlo = new Swiatlo('Jadalnia');
    const kuchniaSwiatlo = new Swiatlo('Kuchnia');

    const jadalniaWlaczSwiatlo = new PolecenieWlaczSwiatlo(jadalniaSwiatlo);
    const jadalniaWylaczSwiatlo = new PolecenieWylaczSwiatlo(jadalniaSwiatlo);
    const kuchniaWlaczSwiatlo = new PolecenieWlaczSwiatlo(kuchniaSwiatlo);
    const kuchniaWylaczSwiato = new PolecenieWylaczSwiatlo(kuchniaSwiatlo);

    superPilotZWycofywaniem.ustawPolecenie(
      0,
      jadalniaWlaczSwiatlo,
      jadalniaWylaczSwiatlo
    );
    superPilotZWycofywaniem.ustawPolecenie(
      1,
      kuchniaWlaczSwiatlo,
      kuchniaWylaczSwiato
    );

    CommandComponent.msgService.WriteLine(
      superPilotZWycofywaniem.toString() + '\n'
    );

    superPilotZWycofywaniem.wcisnietoPrzyciskWlacz(0);
    superPilotZWycofywaniem.wcisnietoPrzyciskWylacz(0);
    superPilotZWycofywaniem.wcisnietoPrzyciskWycofaj();
    superPilotZWycofywaniem.wcisnietoPrzyciskWlacz(1);
    superPilotZWycofywaniem.wcisnietoPrzyciskWylacz(1);
  }

  public ngOnInit() {}
}

class MiniPilot {
  private slot: Polecenie;
  public ustawPolecenie(polecenie: Polecenie) {
    this.slot = polecenie;
  }
  public przyciskZostalNacisniety() {
    this.slot.wykonaj();
  }
}

interface Polecenie {
  memberName: string;
  wycofaj(): void;
  wykonaj(): void;
}

class PolecenieWlaczSwiatlo implements Polecenie {
  public memberName = 'PolecenieWlaczSwiatlo';
  public constructor(private swiatlo: Swiatlo) {}
  public wykonaj(): void {
    this.swiatlo.wlacz();
  }
  public wycofaj(): void {
    this.swiatlo.wylacz();
  }
}

class Swiatlo {
  public constructor(private miejsce?: string) {}
  public wylacz(): void {
    if (this.miejsce) {
      CommandComponent.msgService.WriteLine(
        `${this.miejsce} swiatło wyłączone`
      );
    } else {
      CommandComponent.msgService.WriteLine('Światło wyłączone');
    }
  }
  public wlacz(): void {
    if (this.miejsce) {
      CommandComponent.msgService.WriteLine(`${this.miejsce} swiatło włączone`);
    } else {
      CommandComponent.msgService.WriteLine('Światło włączone');
    }
  }
}

class PolecenieOtworzDrzwiGarazowe implements Polecenie {
  public memberName = 'PolecenieOtworzDrzwiGarazowe';
  public constructor(private drzwiGarazowe: DrzwiGarazowe) {}
  public wykonaj(): void {
    this.drzwiGarazowe.doGory();
  }
  public wycofaj(): void {}
}

class DrzwiGarazowe {
  public doGory(): void {
    CommandComponent.msgService.WriteLine('Drzwi garazowe są otwarte');
  }
}

class SuperPilot {
  private poleceniaWlacz: Polecenie[];
  private poleceniaWylacz: Polecenie[];

  public constructor() {
    this.poleceniaWlacz = new Array<Polecenie>(7);
    this.poleceniaWylacz = new Array<Polecenie>(7);

    const brakPolecenia = new BrakPolecenia();
    for (let index = 0; index < 7; index++) {
      this.poleceniaWlacz[index] = brakPolecenia;
      this.poleceniaWylacz[index] = brakPolecenia;
    }
  }

  public ustawPolecenie(
    slot: number,
    polecenieWlacz: Polecenie,
    polecenieWylacz: Polecenie
  ) {
    this.poleceniaWlacz[slot] = polecenieWlacz;
    this.poleceniaWylacz[slot] = polecenieWylacz;
  }

  public wcisnietoPrzyciskWlacz(slot: number) {
    this.poleceniaWlacz[slot].wykonaj();
  }

  public wcisnietoPrzyciskWylacz(slot: number) {
    this.poleceniaWylacz[slot].wykonaj();
  }

  public toString(): string {
    let stringBuff = '\n----- SuperPilot -----\n';
    for (let index = 0; index < this.poleceniaWlacz.length; index++) {
      stringBuff += `[slot ${index}] ${
        this.poleceniaWlacz[index].memberName
      } \t ${this.poleceniaWylacz[index].memberName}\n`;
    }

    return stringBuff;
  }
}

class BrakPolecenia implements Polecenie {
  public memberName = 'BrakPolecenia';
  public wykonaj(): void {}
  public wycofaj(): void {}
}

class PolecenieWylaczSwiatlo implements Polecenie {
  public constructor(private swiatlo: Swiatlo) {}
  public memberName = 'PolecenieWylaczSwiatlo';
  public wycofaj(): void {
    this.swiatlo.wlacz();
  }
  public wykonaj(): void {
    this.swiatlo.wylacz();
  }
}

class PolecenieWiezaStereoWlaczCD implements Polecenie {
  public memberName = 'PolecenieWiezaStereoWlaczCD';
  public constructor(private wiezaStereo: WiezaStereo) {}
  public wycofaj(): void {}
  public wykonaj(): void {
    this.wiezaStereo.wlacz();
    this.wiezaStereo.ustawCD();
    this.wiezaStereo.ustawGlosnosc(11);
  }
}

class WiezaStereo {
  public wylacz(): void {
    CommandComponent.msgService.WriteLine('Wieza stereo wylaczona');
  }
  public wlacz(): void {
    CommandComponent.msgService.WriteLine('Wieza stereo wlaczona');
  }
  public ustawCD(): void {
    CommandComponent.msgService.WriteLine('Wieza stereo wybrano odtwarzacz CD');
  }
  public ustawGlosnosc(volume: number): void {
    CommandComponent.msgService.WriteLine(
      `Wieza stereo glosnosc ustawiona na ${volume}`
    );
  }
}

class PolecenieWylaczWiezaStereo implements Polecenie {
  public memberName = 'PolecenieWiezaStereoWylaczCD';
  public constructor(private wiezaStereo: WiezaStereo) {}
  public wycofaj(): void {}
  public wykonaj(): void {
    this.wiezaStereo.wylacz();
  }
}

class SuperPilotZWycofywaniem {
  private poleceniaWlacz: Polecenie[];
  private poleceniaWylacz: Polecenie[];
  private polecenieWycofaj: Polecenie;

  public constructor() {
    this.poleceniaWlacz = new Array<Polecenie>(7);
    this.poleceniaWylacz = new Array<Polecenie>(7);

    const brakPolecenia = new BrakPolecenia();
    for (let index = 0; index < 7; index++) {
      this.poleceniaWlacz[index] = brakPolecenia;
      this.poleceniaWylacz[index] = brakPolecenia;
    }
    this.polecenieWycofaj = brakPolecenia;
  }

  public ustawPolecenie(
    slot: number,
    polecenieWlacz: Polecenie,
    polecenieWylacz: Polecenie
  ) {
    this.poleceniaWlacz[slot] = polecenieWlacz;
    this.poleceniaWylacz[slot] = polecenieWylacz;
  }

  public wcisnietoPrzyciskWlacz(slot: number) {
    this.poleceniaWlacz[slot].wykonaj();
    this.polecenieWycofaj = this.poleceniaWlacz[slot];
  }

  public wcisnietoPrzyciskWylacz(slot: number) {
    this.poleceniaWylacz[slot].wykonaj();
    this.polecenieWycofaj = this.poleceniaWylacz[slot];
  }

  public wcisnietoPrzyciskWycofaj() {
    CommandComponent.msgService.WriteLine('----- wycofaj start');
    this.polecenieWycofaj.wycofaj();
    CommandComponent.msgService.WriteLine('----- wycofaj koniec');
  }

  public toString(): string {
    let stringBuff = '\n----- SuperPilotZWycofywaniem -----\n';
    for (let index = 0; index < this.poleceniaWlacz.length; index++) {
      stringBuff += `[slot ${index}] ${
        this.poleceniaWlacz[index].memberName
      } \t ${this.poleceniaWylacz[index].memberName}\n`;
    }

    return stringBuff;
  }
}
