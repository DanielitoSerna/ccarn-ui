import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapacitacionComponent } from './capacitacion/capacitacion.component';
import { EvaluacionAndrologicaComponent } from './evaluacionAndrologica/evaluacionAndrologica.component';
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
    path: 'listasIatf',
    component: ListasComponent
  },
  {
    path: 'listaDonadoras',
    component: ListaDonadorasComponent
  },

  {
    path: 'listasDonadoras',
    component: ListasComponent
  },
  {
    path: 'listaToro',
    component: ListaToroComponent
  },
  {
    path: 'listasToro',
    component: ListasComponent
  },
  {
    path: 'transferenciaEmbrion',
    component: TransferenciaEmbrionComponent
  },
  {
    path: 'listasTransferenciaEmbrion',
    component: ListasComponent
  },
  {
    path: 'evaluacionAndrologica',
    component: EvaluacionAndrologicaComponent
  },
  {
    path: 'listasEvaluacionAndrologica',
    component: ListasComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
