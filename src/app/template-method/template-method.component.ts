import { Component, OnInit } from '@angular/core';
import { ExtendedMsgService } from './template-method-element/template-method-element.component';

@Component({
  selector: 'app-template-method',
  templateUrl: './template-method.component.html',
  styleUrls: ['./template-method.component.scss', '../app.component.scss']
})
export class TemplateMethodComponent implements OnInit {
  public static msgService = new ExtendedMsgService();
  public classReference = TemplateMethodComponent;
  private napoj: NapojZKofeina;
  private napojZHaczykiem: NapojZKofeinaZHaczykiem;

  public constructor() {
    this.bezHaczyka();
    this.zHaczykiem();
  }

  private bezHaczyka() {
    TemplateMethodComponent.msgService.WriteLine('---- bez haczyka ----');
    TemplateMethodComponent.msgService.WriteLine('Herbata:');
    this.napoj = new Herbata();
    this.napoj.recepturaParzenia();

    TemplateMethodComponent.msgService.WriteLine('\nKawa:');
    this.napoj = new Kawa();
    this.napoj.recepturaParzenia();
  }

  private zHaczykiem() {
    TemplateMethodComponent.msgService.WriteLine(
      '\n---- z pseudo haczykiem ----'
    );
    TemplateMethodComponent.msgService.WriteLine('Herbata:');
    this.napojZHaczykiem = new HerbataZHaczykiem();
    this.napojZHaczykiem.recepturaParzenia();

    TemplateMethodComponent.msgService.WriteLine('\nKawa:');
    this.napojZHaczykiem = new KawaZHaczykiem();
    this.napojZHaczykiem.recepturaParzenia();
  }

  public ngOnInit() {}
}

abstract class NapojZKofeina {
  public recepturaParzenia() {
    this.gotowanieWody();
    this.zaparzanie();
    this.nalewanieDoFilizanki();
    this.domieszanieDodatkow();
  }
  private gotowanieWody(): any {
    TemplateMethodComponent.msgService.WriteLine('Gotowanie wody');
  }
  protected abstract zaparzanie(): any;
  private nalewanieDoFilizanki(): any {
    TemplateMethodComponent.msgService.WriteLine('Nalewanie do filizanki');
  }
  protected abstract domieszanieDodatkow(): any;
}

class Herbata extends NapojZKofeina {
  public zaparzanie() {
    TemplateMethodComponent.msgService.WriteLine(
      'Wkladanie torebki do wrzatku'
    );
  }
  public domieszanieDodatkow() {
    TemplateMethodComponent.msgService.WriteLine('Dodawanie cytryny');
  }
}

class Kawa extends NapojZKofeina {
  public zaparzanie() {
    TemplateMethodComponent.msgService.WriteLine(
      'Zaparzanie i przesaczanie kawy przez filtr'
    );
  }
  public domieszanieDodatkow() {
    TemplateMethodComponent.msgService.WriteLine(
      'Dodawanie cukru oraz mleka do smaku'
    );
  }
}

abstract class NapojZKofeinaZHaczykiem {
  public recepturaParzenia() {
    this.gotowanieWody();
    this.zaparzanie();
    this.nalewanieDoFilizanki();
    this.pytanieODodatki();
  }
  private gotowanieWody(): any {
    TemplateMethodComponent.msgService.WriteLine('Gotowanie wody');
  }
  protected abstract zaparzanie(): any;
  private nalewanieDoFilizanki(): any {
    TemplateMethodComponent.msgService.WriteLine('Nalewanie do filizanki');
  }
  private pytanieODodatki() {
    TemplateMethodComponent.msgService.WriteLine(
      'Czy dodac dodatki?',
      true,
      true
    );
  }
}

class HerbataZHaczykiem extends NapojZKofeinaZHaczykiem {
  public zaparzanie() {
    TemplateMethodComponent.msgService.WriteLine(
      'Wkladanie torebki do wrzatku'
    );
  }
}

class KawaZHaczykiem extends NapojZKofeinaZHaczykiem {
  public zaparzanie() {
    TemplateMethodComponent.msgService.WriteLine(
      'Zaparzanie i przesaczanie kawy przez filtr'
    );
  }
}
