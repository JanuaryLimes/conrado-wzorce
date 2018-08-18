import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StrategyComponent } from './strategy/strategy.component';
import { ObserverComponent } from './observer/observer.component';
import { DecoratorComponent } from './decorator/decorator.component';

@NgModule({
  declarations: [
    AppComponent,
    StrategyComponent,
    ObserverComponent,
    DecoratorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
