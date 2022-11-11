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
import { ListasComponent } from './listas/listas.component';
import { TransferenciaEmbrionComponent } from './transferenciaEmbrion/transferenciaEmbrion.component';
import { EvaluacionAndrologicaComponent } from './evaluacionAndrologica/evaluacionAndrologica.component';
import { ComponentesModule } from './componentes/componentes.module';
import { CapacitacionComponent } from './capacitacion/capacitacion.component';
import { VeterinarioComponent } from './veterinario/veterinario.component';
import { PotreroComponent } from './potrero/potrero.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { FormatosBraComponent } from './formatosBra/formatosBra.component';
import { RecomendacionComponent } from './recomendacion/recomendacion.component';
import { ListaBraComponent } from './listaBra/listaBra.component';
import { AspiracionFolicularComponent } from './aspiracionFolicular/aspiracionFolicular.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ListaAsiComponent,
    ListaBgpComponent,
    ListaIatfComponent,
    ListaDonadorasComponent,
    ListaToroComponent,
    ListasComponent,
    TransferenciaEmbrionComponent,
    EvaluacionAndrologicaComponent,
    CapacitacionComponent,
    VeterinarioComponent,
    PotreroComponent,
    VehiculosComponent,
    FormatosBraComponent,
    RecomendacionComponent,
    ListaBraComponent,
    AspiracionFolicularComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    PrimeModule,
    HttpClientModule,
    SocialLoginModule,
    NgChartsModule,
    ComponentesModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
