import { Component} from '@angular/core';
import { AppService } from '../app.services';
import { MessageService } from 'primeng/api';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-listaIatf',
  templateUrl: './listaIatf.component.html',
  styleUrls: ['./listaIatf.component.scss']
})
export class ListaIatfComponent {

  departamentos = [{label: "Antioquia", value: "Antioquia"}];
  municipios = [
    {label: "Caracolí", value: "Caracolí"},
    {label: "Maceo", value: "Maceo"},
    {label: "Puerto Berrío", value: "Puerto Berrío"},
    {label: "Puerto Triunfo", value: "Puerto Triunfo"},
    {label: "Puerto Nare", value: "Puerto Nare"},
    {label: "Yondó", value: "Yondó"},
    {label: "Remedios", value: "Remedios"},
    {label: "Segovia", value: "Segovia"},
    {label: "Necoclí", value: "Necoclí"},
    {label: "Turbo", value: "Turbo"},
  ];
  objeto:any = {};

  items:any = [
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
  ];

  constructor(private service: AppService, private messageService: MessageService) {

  }

  cancelar() {
    history.back();
  }

  guardar() {
    if(!this.objeto.fecha || !this.objeto.departamento || !this.objeto.municipio || !this.objeto.nombrePropietario || !this.objeto.nombreFinca || !this.objeto.vereda) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Faltan datos por ingresar por favor verifica'});
    }
  }
}
