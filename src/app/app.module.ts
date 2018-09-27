import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StrategyComponent } from './strategy/strategy.component';
import { ObserverComponent } from './observer/observer.component';
import { DecoratorComponent } from './decorator/decorator.component';
import { FactoryComponent } from './factory/factory.component';
import { SingletonComponent } from './singleton/singleton.component';
import { CommandComponent } from './command/command.component';

@NgModule({
  declarations: [
    AppComponent,
    StrategyComponent,
    ObserverComponent,
    DecoratorComponent,
    FactoryComponent,
    SingletonComponent,
    CommandComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
