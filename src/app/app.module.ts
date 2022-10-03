import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {PrimeModule} from "./primeNG/prime.module";
import { AppService } from './app.services';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { SocialLoginModule } from 'angularx-social-login';
import { NgChartsModule } from 'ng2-charts';
import { ListaAsiComponent } from './listaAsi/listaAsi.component';
import { FormsModule } from '@angular/forms';
import { ListaBgpComponent } from './listaBgp/listaBgp.component';
import { ListaIatfComponent } from './listaIatf/listaIatf.component';
import { ListaDonadorasComponent } from './listaDonadoras/listaDonadoras.component';
import { ListaToroComponent } from './listaToro/listaToro.component';
import { TransferenciaEmbrionComponent } from './transferenciaEmbrion/transferenciaEmbrion.component';
import { EvaluacionAndrologicaComponent } from './evaluacionAndrologica/evaluacionAndrologica.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ListaAsiComponent,
    ListaBgpComponent,
    ListaIatfComponent,
    ListaDonadorasComponent,
    ListaToroComponent,
    TransferenciaEmbrionComponent,
    EvaluacionAndrologicaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    PrimeModule,
    HttpClientModule,
    SocialLoginModule,
    NgChartsModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
