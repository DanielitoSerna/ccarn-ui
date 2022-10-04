import { Component} from '@angular/core';
import { AppService } from '../app.services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-listaToro',
  templateUrl: './listaToro.component.html',
  styleUrls: ['./listaToro.component.scss']
})
export class ListaToroComponent {

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

  objeto: any = {};

  items:any = [
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}
  ];

  constructor(private service: AppService, private messageService: MessageService) {

  }

  cancelar() {
    history.back();
  }

  guardar() {
    
  }
}
