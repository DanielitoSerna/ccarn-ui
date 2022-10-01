import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ListaAsiComponent } from './listaAsi/listaAsi.component';
import { ListaBgpComponent } from './listaBgp/listaBgp.component';
import { ListaDonadorasComponent } from './listaDonadoras/listaDonadoras.component';
import { ListaIatfComponent } from './listaIatf/listaIatf.component';
import { ListaToroComponent } from './listaToro/listaToro.component';
import { TransferenciaEmbrionComponent } from './transferenciaEmbrion/transferenciaEmbrion.component';

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
    path: 'listaAsi',
    component: ListaAsiComponent
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
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
