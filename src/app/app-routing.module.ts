import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ListaAsiComponent } from './listaAsi/listaAsi.component';
import { ListaBgpComponent } from './listaBgp/listaBgp.component';
import { ListaDonadorasComponent } from './listaDonadoras/listaDonadoras.component';
import { ListaIatfComponent } from './listaIatf/listaIatf.component';
import { ListasComponent } from './listas/listas.component';
import { ListaToroComponent } from './listaToro/listaToro.component';

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



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
