import { Component, OnInit } from '@angular/core';
import { MsgService } from '../comunication/comunication.module';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss', '../app.component.scss']
})
export class StateComponent implements OnInit {
  public static msgService = new MsgService();
  public classReference = StateComponent;

  public constructor() {
    const asg = new AutomatSprzedajacy(5);
    asg.toString();

    asg.wlozMonete();
    asg.przekrecGalke();

    asg.toString();

    asg.wlozMonete();
    asg.przekrecGalke();
    asg.wlozMonete();
    asg.przekrecGalke();

    asg.toString();
  }

  public ngOnInit() {}
}

interface Stan {
  wlozMonete();
  zwrocMonete();
  przekrecGalke();
  wydaj();
}

class AutomatSprzedajacy {
  public stanBrakGum: Stan;
  public stanNieMaMonety: Stan;
  public stanJestMoneta: Stan;
  public stanGumaSprzedana: Stan;
  public stanWygrana: Stan;
  public liczba = 0;

  private stan = this.stanBrakGum;

  public constructor(liczbaGum: number) {
    this.stanBrakGum = new StanBrakGum(this);
    this.stanNieMaMonety = new StanNieMaMonety(this);
    this.stanJestMoneta = new StanJestMoneta(this);
    this.stanGumaSprzedana = new StanGumaSprzedana(this);
    this.stanWygrana = new StanWygrana(this);

    this.liczba = liczbaGum;
    if (this.liczba > 0) {
      this.stan = this.stanNieMaMonety;
    }
  }

  public ustawStan(stan: Stan) {
    this.stan = stan;
  }

  public wlozMonete() {
    this.stan.wlozMonete();
  }

  public zwrocMonete() {
    this.stan.zwrocMonete();
  }

  public przekrecGalke() {
    this.stan.przekrecGalke();
    this.stan.wydaj();
  }

  public zwolnijGume() {
    StateComponent.msgService.WriteLine('Wypada guma...');
    if (this.liczba !== 0) {
      this.liczba = this.liczba - 1;
    }
  }

  public toString() {
    let result = '';
    result += '\nMighty Gumball, Inc.';
    result += '\nJava-enabled Standing Gumball Model #2004"';
    result += '\nInventory: ' + this.liczba + ' gumball';
    if (this.liczba !== 1) {
      result += 's';
    }
    result += '\n';
    result += 'Machine is ' + this.stan.toString() + '\n\n';
    StateComponent.msgService.WriteLine(result);
  }
}

class StanGumaSprzedana implements Stan {
  public constructor(private automatSprzedajacy: AutomatSprzedajacy) {}
  public wlozMonete() {
    StateComponent.msgService.WriteLine('Prosze czekac na gume');
  }
  public zwrocMonete() {
    StateComponent.msgService.WriteLine(
      'Niestety, nie mozna zwrocic monety po przekreceniu galki'
    );
  }
  public przekrecGalke() {
    StateComponent.msgService.WriteLine(
      'Nie dostaniesz gumy tylko dlatego, ze przekreciles drugi raz!'
    );
  }
  public wydaj() {
    this.automatSprzedajacy.zwolnijGume();

    if (this.automatSprzedajacy.liczba > 0) {
      this.automatSprzedajacy.ustawStan(
        this.automatSprzedajacy.stanNieMaMonety
      );
    } else {
      StateComponent.msgService.WriteLine('Ups, koniec gum!');
      this.automatSprzedajacy.ustawStan(this.automatSprzedajacy.stanBrakGum);
    }
  }
  public toString() {
    return 'wydaje monete';
  }
}

class StanBrakGum implements Stan {
  public constructor(private automatSprzedajacy: AutomatSprzedajacy) {}
  public wlozMonete() {
    StateComponent.msgService.WriteLine(
      'Nie mozna wrzucic monety, automat jest pusty'
    );
  }
  public zwrocMonete() {
    StateComponent.msgService.WriteLine(
      'Nie mozna zwrocic monety, zadna moneta nie zostala wrzucona'
    );
  }
  public przekrecGalke() {
    StateComponent.msgService.WriteLine(
      'Obrociles galke, ale automat jest pusty'
    );
  }
  public wydaj() {
    StateComponent.msgService.WriteLine('Nie wydano gumy');
  }
  public toString() {
    return 'sold out';
  }
}

class StanNieMaMonety implements Stan {
  public constructor(private automatSprzedajacy: AutomatSprzedajacy) {}
  public wlozMonete() {
    StateComponent.msgService.WriteLine('Moneta przyjeta');
    this.automatSprzedajacy.ustawStan(this.automatSprzedajacy.stanJestMoneta);
  }
  public zwrocMonete() {
    StateComponent.msgService.WriteLine('Nie wlozyles monety');
  }
  public przekrecGalke() {
    StateComponent.msgService.WriteLine(
      'Zanim przekrecisz galke, wrzuc monete'
    );
  }
  public wydaj() {
    StateComponent.msgService.WriteLine('Najpierw zaplac');
  }
  public toString() {
    return 'oczekuje na monete';
  }
}

function randomIntFromInterval(
  min: number,
  max: number // min and max included
) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class StanJestMoneta implements Stan {
  public constructor(private automatSprzedajacy: AutomatSprzedajacy) {}
  public wlozMonete() {
    StateComponent.msgService.WriteLine(
      'Nie mozesz wlozyc wiecej niz jednej monety'
    );
  }
  public zwrocMonete() {
    StateComponent.msgService.WriteLine('Moneta zwrocona');
    this.automatSprzedajacy.ustawStan(this.automatSprzedajacy.stanNieMaMonety);
  }
  public przekrecGalke() {
    StateComponent.msgService.WriteLine('Obrociles galke...');
    const wygrana = randomIntFromInterval(0, 9);
    if (wygrana === 0) {
      this.automatSprzedajacy.ustawStan(this.automatSprzedajacy.stanWygrana);
    } else {
      this.automatSprzedajacy.ustawStan(
        this.automatSprzedajacy.stanGumaSprzedana
      );
    }
  }
  public wydaj() {
    StateComponent.msgService.WriteLine('Nie wydano gumy');
  }
  public toString() {
    return 'oczekuje na przekrecenie galki';
  }
}

class StanWygrana implements Stan {
  public constructor(private automatSprzedajacy: AutomatSprzedajacy) {}
  public wlozMonete() {
    StateComponent.msgService.WriteLine('Prosze czekac na gume');
  }
  public zwrocMonete() {
    StateComponent.msgService.WriteLine(
      'Niestety, nie mozna zwrocic monety po przekreceniu galki'
    );
  }
  public przekrecGalke() {
    StateComponent.msgService.WriteLine(
      'Nie dostaniesz gumy tylko dlatego, ze przekreciles drugi raz!'
    );
  }
  public wydaj() {
    StateComponent.msgService.WriteLine('Wygrales! Dostajesz druga gume');
    const asg = this.automatSprzedajacy;

    asg.zwolnijGume();

    if (asg.liczba === 0) {
      asg.ustawStan(asg.stanBrakGum);
    } else {
      asg.zwolnijGume();

      if (asg.liczba > 0) {
        asg.ustawStan(asg.stanNieMaMonety);
      } else {
        StateComponent.msgService.WriteLine('Ups, koniec gum!');
        asg.ustawStan(asg.stanBrakGum);
      }
    }
  }
  public toString() {
    return 'despensing two gumballs for your quarter, because YOU\'RE A WINNER!';
  }
}
