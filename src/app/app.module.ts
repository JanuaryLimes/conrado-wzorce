import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StrategyComponent } from './strategy/strategy.component';
import { ObserverComponent } from './observer/observer.component';
import { DecoratorComponent } from './decorator/decorator.component';
import { FactoryComponent } from './factory/factory.component';
import { SingletonComponent } from './singleton/singleton.component';
import { CommandComponent } from './command/command.component';
import { AdapterComponent } from './adapter/adapter.component';
import { FacadeComponent } from './facade/facade.component';
import { TemplateMethodComponent } from './template-method/template-method.component';
import { TemplateMethodElementComponent } from './template-method/template-method-element/template-method-element.component';
import { InBtnDirective } from './template-method/template-method-element/in-btn.directive';
import { InButtonComponent } from './template-method/template-method-element/in-button/in-button.component';

@NgModule({
  declarations: [
    AppComponent,
    StrategyComponent,
    ObserverComponent,
    DecoratorComponent,
    FactoryComponent,
    SingletonComponent,
    CommandComponent,
    AdapterComponent,
    FacadeComponent,
    TemplateMethodComponent,
    TemplateMethodElementComponent,
    InBtnDirective,
    InButtonComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [InButtonComponent]
})
export class AppModule {}
