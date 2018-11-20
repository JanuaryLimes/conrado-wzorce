import { Component, OnInit } from '@angular/core';
import { MsgService } from '../comunication/comunication.module';

@Component({
  selector: 'app-facade',
  templateUrl: './facade.component.html',
  styleUrls: ['./facade.component.scss', '../app.component.scss']
})
export class FacadeComponent implements OnInit {
  public static msgService = new MsgService();
  public classReference = FacadeComponent;

  public constructor() {
    const kinoDomowe = new FasadaKinaDomowego(
      new Wzmacniacz(),
      new OdtwarzaczDVD(),
      new MaszynkaPopcorn(),
      new Ekran(),
      new Projektor()
    );
    kinoDomowe.odtwarzanieFilmu('Poszukiwacze zaginionej arki');
    kinoDomowe.koniecFilmu();
  }

  public ngOnInit() {}
}

class FasadaKinaDomowego {
  public constructor(
    private wzmacniacz: Wzmacniacz,
    private dvd: OdtwarzaczDVD,
    private popcorn: MaszynkaPopcorn,
    private ekran: Ekran,
    private projektor: Projektor
  ) {}

  public odtwarzanieFilmu(film: string): void {
    FacadeComponent.msgService.WriteLine(
      '---- Przygotuj sie na seans filmowy...'
    );
    this.popcorn.wlacz();
    this.popcorn.przygotujPopcorn();
    this.ekran.wDol();
    this.projektor.wlacz();
    this.projektor.trybSzerokoekranowy();
    this.wzmacniacz.wlacz();
    this.wzmacniacz.ustawDvd(this.dvd);
    this.wzmacniacz.ustawDzwiekPrzestrzenny();
    this.dvd.wlacz();
    this.dvd.odtwarzaj(film);
  }
  public koniecFilmu() {
    FacadeComponent.msgService.WriteLine(
      '\n---- Koniec seansu, wylaczam kino domowe...'
    );
    this.popcorn.wylacz();
    this.ekran.wGore();
    this.projektor.wylacz();
    this.wzmacniacz.wylacz();
    this.dvd.zatrzymaj();
    this.dvd.wysunDysk();
    this.dvd.wylacz();
  }
}

class Wzmacniacz {
  public wylacz(): any {
    FacadeComponent.msgService.WriteLine('Wzmacniacz: wylaczony');
  }
  public wlacz() {
    FacadeComponent.msgService.WriteLine('Wzmacniacz: wlaczony');
  }
  public ustawDvd(dvd: OdtwarzaczDVD) {
    FacadeComponent.msgService.WriteLine(
      'Wzmacniacz: wejscie ustwione odtwarzacz DVD'
    );
  }
  public ustawDzwiekPrzestrzenny() {
    FacadeComponent.msgService.WriteLine(
      'Wzmacniacz: wlaczono dzwiek przestrzenny (5 glosnikow, 1 subwoofer)'
    );
  }
}

class OdtwarzaczDVD {
  public wylacz(): any {
    FacadeComponent.msgService.WriteLine('Odtwarzacz DVD: wylacz');
  }
  public wysunDysk(): any {
    FacadeComponent.msgService.WriteLine('Odtwarzacz DVD: wysuwanie dysku DVD');
  }
  public zatrzymaj(): any {
    FacadeComponent.msgService.WriteLine(
      'Odtwarzacz DVD: odtwarzanie zatrzymane'
    );
  }
  public odtwarzaj(film: string): any {
    FacadeComponent.msgService.WriteLine(
      'Odtwarzacz DVD: odtwarzanie filmu "' + film + '"'
    );
  }
  public wlacz(): any {
    FacadeComponent.msgService.WriteLine('Odtwarzacz DVD: wlaczony');
  }
}
class MaszynkaPopcorn {
  public wylacz(): any {
    FacadeComponent.msgService.WriteLine(
      'Maszynka do robienia popcornu: wylaczona'
    );
  }
  public przygotujPopcorn(): any {
    FacadeComponent.msgService.WriteLine(
      'Maszynka do robienia popcornu: popcorn w drodze'
    );
  }
  public wlacz(): any {
    FacadeComponent.msgService.WriteLine(
      'Maszynka do robienia popcornu: wlaczona'
    );
  }
}
class Ekran {
  public wGore(): any {
    FacadeComponent.msgService.WriteLine('Ekran: podnoszony');
  }
  public wDol(): any {
    FacadeComponent.msgService.WriteLine('Ekran: opuszczony');
  }
}
class Projektor {
  public wylacz(): any {
    FacadeComponent.msgService.WriteLine('Projektor: wylaczony');
  }
  public trybSzerokoekranowy(): any {
    FacadeComponent.msgService.WriteLine(
      'Projektor: wlaczony tryb szerokoekranowy (16:9)'
    );
  }
  public wlacz(): any {
    FacadeComponent.msgService.WriteLine('Projektor: wlaczony');
  }
}
