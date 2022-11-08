import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapacitacionComponent } from './capacitacion/capacitacion.component';
import { EvaluacionAndrologicaComponent } from './evaluacionAndrologica/evaluacionAndrologica.component';
import { FormatosBraComponent } from './formatosBra/formatosBra.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListaAsiComponent } from './listaAsi/listaAsi.component';
import { ListaBgpComponent } from './listaBgp/listaBgp.component';
import { ListaDonadorasComponent } from './listaDonadoras/listaDonadoras.component';
import { ListaIatfComponent } from './listaIatf/listaIatf.component';
import { ListasComponent } from './listas/listas.component';
import { ListaToroComponent } from './listaToro/listaToro.component';
import { PotreroComponent } from './potrero/potrero.component';
import { TransferenciaEmbrionComponent } from './transferenciaEmbrion/transferenciaEmbrion.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VeterinarioComponent } from './veterinario/veterinario.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'listasAsi',
    component: ListasComponent
  },
  {
    path: 'listaAsi',
    component: ListaAsiComponent
  },
  {
    path: 'listasBgp',
    component: ListasComponent
  },
  {
    path: 'listaBgp',
    component: ListaBgpComponent
  },
  {
    path: 'listaIatf',
    component: ListaIatfComponent
  },
  {
    path: 'listaDonadoras',
    component: ListaDonadorasComponent
  },
  {
    path: 'listaToro',
    component: ListaToroComponent
  },
  {
    path: 'transferenciaEmbrion',
    component: TransferenciaEmbrionComponent
  },
  {
    path: 'evaluacionAndrologica',
    component: EvaluacionAndrologicaComponent
  },
  {
    path: 'capacitacion',
    component: CapacitacionComponent
  },
  {
    path: 'veterinario',
    component: VeterinarioComponent
  },
  {
    path: 'potrero',
    component: PotreroComponent
  },
  {
    path: 'vehiculo',
    component: VehiculosComponent
  },
  {
    path: 'vehiculos',
    component: ListasComponent
  },
  {
    path: 'capacitaciones',
    component: ListasComponent
  },
  {
    path: 'veterinarios',
    component: ListasComponent
  },
  {
    path: 'potreros',
    component: ListasComponent
  },
  {
    path: 'vehiculos',
    component: ListasComponent
  },
  {
    path: 'formatosBra',
    component: FormatosBraComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
