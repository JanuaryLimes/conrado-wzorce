import { Component, OnInit } from '@angular/core';
import { MsgService } from '../comunication/comunication.module';

@Component({
  selector: 'app-iterator-and-composite',
  templateUrl: './iterator-and-composite.component.html',
  styleUrls: [
    './iterator-and-composite.component.scss',
    '../app.component.scss'
  ]
})
export class IteratorAndCompositeComponent implements OnInit {
  public static msgService = new MsgService();
  public classReference = IteratorAndCompositeComponent;
  public constructor() {
    const menuUJacka: Menu = new UJackaMenu();

    const kelnerka = new Kelnerka(menuUJacka);
    kelnerka.drukujMenu();

    this.nowaKelnerkaTest();
  }

  public ngOnInit() {}

  private nowaKelnerkaTest() {
    this.classReference.msgService.WriteLine('\n\ntest nowej kelnerki');

    const menu: MenuSkladnik = new NewMenu('Menu 1', 'Sniadania');
    const menu2: MenuSkladnik = new NewMenu('Menu 2', 'Lunch');
    const menu3: MenuSkladnik = new NewMenu('Menu 3', 'Obiad');
    const menuDesery: MenuSkladnik = new NewMenu('Menu desery', 'desery');

    const wszystkie: MenuSkladnik = new NewMenu(
      'Wszystkie menu',
      'Polaczone menu'
    );

    wszystkie.dodaj(menu);
    wszystkie.dodaj(menu2);
    wszystkie.dodaj(menu3);

    menu.dodaj(new PozycjaMenu('Pozycja 1', 'opis 1', true, 1.59));
    menu.dodaj(new PozycjaMenu('Pozycja 11', 'opis 1', true, 1.59));
    menu.dodaj(new PozycjaMenu('Pozycja 111', 'opis 1', true, 1.59));
    menu.dodaj(new PozycjaMenu('Pozycja 1111', 'opis 1', true, 1.59));

    menu2.dodaj(new PozycjaMenu('Pozycja 2', 'opis 2', true, 1.59));
    menu2.dodaj(new PozycjaMenu('Pozycja 22', 'opis 2', true, 1.59));
    menu2.dodaj(new PozycjaMenu('Pozycja 222', 'opis 2', true, 1.59));

    menu3.dodaj(new PozycjaMenu('Pozycja 3', 'opis 3', false, 1.59));
    menu3.dodaj(new PozycjaMenu('Pozycja 33', 'opis 3', false, 1.59));
    menu3.dodaj(new PozycjaMenu('Pozycja 333', 'opis 3', false, 1.59));
    menu3.dodaj(new PozycjaMenu('Pozycja 3333', 'opis 3', false, 1.59));
    menu3.dodaj(new PozycjaMenu('Pozycja 33333', 'opis 3', false, 1.59));

    menuDesery.dodaj(new PozycjaMenu('Deser', 'Deser 1', false, 2.59));
    menuDesery.dodaj(new PozycjaMenu('Deser2', 'Deser 1', false, 2.59));
    menuDesery.dodaj(new PozycjaMenu('Deser3', 'Deser 1', false, 2.59));
    menuDesery.dodaj(new PozycjaMenu('Deser4', 'Deser 1', false, 2.59));

    menu2.dodaj(menuDesery);

    const nowaKelnerka = new NowaKelnerka(wszystkie);
    nowaKelnerka.drukujMenu();
  }
}

class UJackaMenu implements Menu {
  private pozycjeMenu = new Map<string, PozycjaMenu>();

  public constructor() {
    this.dodajElement(
      'Kanapka wegetarianska z frytkami',
      'Kanapka wegetarianska z salata i pomidorem, frytki',
      true,
      3.99
    );
    this.dodajElement('Zupa dnia', 'Filizanka zypy dnia, salatka', false, 3.69);
  }
  private dodajElement(
    nazwa: string,
    opis: string,
    wegetarianska: boolean,
    cena: number
  ) {
    const pozycjaMenu = new PozycjaMenu(nazwa, opis, wegetarianska, cena);
    this.pozycjeMenu.set(pozycjaMenu.nazwa, pozycjaMenu);
  }

  public utworzIterator(): Iterator {
    return new UJackaMenuIterator(this.pozycjeMenu.values());
  }
}
class UJackaMenuIterator implements Iterator {
  private nextVal: PozycjaMenu;
  public constructor(private valuesIterator: IterableIterator<PozycjaMenu>) {}
  public hasNext(): boolean {
    const next = this.valuesIterator.next();
    this.nextVal = next.value;
    return !next.done;
  }
  public next(): any {
    return this.nextVal;
  }
}

abstract class MenuSkladnik {
  public dodaj(menuSkladnik: MenuSkladnik) {
    throw new Error('Unsupported Operation Exception');
  }
  public usun(menuSkladnik: MenuSkladnik) {
    throw new Error('Unsupported Operation Exception');
  }
  public pobierzPotomek(i: number): MenuSkladnik {
    throw new Error('Unsupported Operation Exception');
  }
  public drukuj() {
    throw new Error('Unsupported Operation Exception');
  }
}

class PozycjaMenu extends MenuSkladnik {
  public constructor(
    public readonly nazwa: string,
    public readonly opis: string,
    public readonly wegetarianska: boolean,
    public readonly cena: number
  ) {
    super();
  }

  public drukuj() {
    let line = this.nazwa;
    if (this.wegetarianska) {
      line += '(w)';
    }
    line += ', ' + this.cena + '\n\t-- ' + this.opis;
    IteratorAndCompositeComponent.msgService.WriteLine(line);
  }
}

interface Iterator {
  hasNext(): boolean;
  next(): any;
}

interface Menu {
  utworzIterator(): Iterator;
}

class Kelnerka {
  public constructor(private uJackaMenu: Menu) {}

  public drukujMenu() {
    const uJackaIterator = this.uJackaMenu.utworzIterator();

    IteratorAndCompositeComponent.msgService.WriteLine('MENU\n----\nSNIADANIA');
    this.drukujMenuInternal(uJackaIterator);
  }
  private drukujMenuInternal(iterator: Iterator) {
    while (iterator.hasNext()) {
      const pozycjaMenu = iterator.next() as PozycjaMenu;
      IteratorAndCompositeComponent.msgService.WriteLine(
        `${pozycjaMenu.nazwa}, ${pozycjaMenu.cena} -- ${pozycjaMenu.opis}`
      );
    }
  }
}

class NewMenu extends MenuSkladnik {
  private menuSkladniki = new Array<MenuSkladnik>();
  public constructor(public nazwa: string, public opis: string) {
    super();
  }
  public dodaj(menuSkladnik: MenuSkladnik) {
    this.menuSkladniki.push(menuSkladnik);
  }
  public usun(menuSkladnik: MenuSkladnik) {
    const index = this.menuSkladniki.indexOf(menuSkladnik, 0);
    this.menuSkladniki.splice(0, 1, this.menuSkladniki[index]);
  }
  public pobierzPotomek(i: number): MenuSkladnik {
    return this.menuSkladniki[i];
  }
  public drukuj() {
    IteratorAndCompositeComponent.msgService.WriteLine(
      `\n${this.nazwa}, ${this.opis}\n-----------------`
    );

    this.menuSkladniki.forEach(item => item.drukuj());
  }
}

class NowaKelnerka {
  public constructor(private wszystkieMenu: MenuSkladnik) {}
  public drukujMenu() {
    this.wszystkieMenu.drukuj();
  }
}
