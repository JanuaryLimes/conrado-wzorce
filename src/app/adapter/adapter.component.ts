import { Component, OnInit } from '@angular/core';
import { MsgService } from '../comunication/comunication.module';

@Component({
  selector: 'app-adapter',
  templateUrl: './adapter.component.html',
  styleUrls: ['./adapter.component.scss', '../app.component.scss']
})
export class AdapterComponent implements OnInit {
  public static msgService = new MsgService();
  public classReference = AdapterComponent;

  public constructor() {
    this.testowanieKaczki();
  }

  public ngOnInit() {}

  private testowanieKaczki(): void {
    const kaczka = new DzikaKaczka();
    const indyk = new DzikiIndyk();
    const indykAdapter = new IndykAdapter(indyk);

    AdapterComponent.msgService.WriteLine('---- Indyk powiada tak...');
    indyk.gulgocz();
    indyk.lataj();

    AdapterComponent.msgService.WriteLine('---- Kaczka powiada tak...');
    this.testujKaczke(kaczka);

    AdapterComponent.msgService.WriteLine('---- IndykAdapter powiada tak...');
    this.testujKaczke(indykAdapter);
  }

  private testujKaczke(kaczka: Kaczka) {
    kaczka.kwacz();
    kaczka.lataj();
  }
}

interface Kaczka {
  kwacz(): void;
  lataj(): void;
}

class DzikaKaczka implements Kaczka {
  public kwacz(): void {
    AdapterComponent.msgService.WriteLine('Kwa! Kwa!');
  }
  public lataj(): void {
    AdapterComponent.msgService.WriteLine('O rany! Latam!');
  }
}

interface Indyk {
  gulgocz(): void;
  lataj(): void;
}

class DzikiIndyk implements Indyk {
  public gulgocz(): void {
    AdapterComponent.msgService.WriteLine('Gulgulgul!');
  }
  public lataj(): void {
    AdapterComponent.msgService.WriteLine(
      'O rany! Latam!... ale tylko na krótkich dystansach'
    );
  }
}

class IndykAdapter implements Kaczka {
  public constructor(private indyk: Indyk) {}
  public kwacz(): void {
    this.indyk.gulgocz();
  }
  public lataj(): void {
    for (let i = 0; i < 5; i++) {
      this.indyk.lataj();
    }
  }
}
