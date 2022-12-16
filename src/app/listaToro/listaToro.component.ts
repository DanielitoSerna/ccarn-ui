import { Component } from '@angular/core';
import { AppService } from '../app.services';
import { MessageService } from 'primeng/api';
import { MomentPipe } from '../componentes/moment.pipe';

@Component({
  selector: 'app-listaToro',
  templateUrl: './listaToro.component.html',
  styleUrls: ['./listaToro.component.scss']
})
export class ListaToroComponent {

  departamentos = [{ label: "Antioquia", value: "Antioquia" }];
  municipios = [
    { label: "Caracolí", value: "Caracolí" },
    { label: "Maceo", value: "Maceo" },
    { label: "Puerto Berrío", value: "Puerto Berrío" },
    { label: "Puerto Triunfo", value: "Puerto Triunfo" },
    { label: "Puerto Nare", value: "Puerto Nare" },
    { label: "Yondó", value: "Yondó" },
    { label: "Remedios", value: "Remedios" },
    { label: "Segovia", value: "Segovia" },
    { label: "Necoclí", value: "Necoclí" },
    { label: "Turbo", value: "Turbo" },
  ];

  objeto: any = {};

  items:any = [
    {}
  ];

  constructor(private service: AppService, private messageService: MessageService) {
    let objeto: any = localStorage.getItem("objeto");
    objeto = JSON.parse(objeto ? objeto : '');
    this.objeto = objeto;
    if (objeto.id != undefined) {
      this.objeto.fecha = MomentPipe.transform(this.objeto.fecha);
      let request = {
        tabla: 'DetalleFormato',
        campoOrden: 'id',
        orden: 'asc',
        where: 'formatoBean.id = ' + objeto.id,
        cantidad: 100,
        pagina: 0
      }
      this.service.initProgress();
      this.service.listarDatos(request).then(data => {
        this.items = data;
        this.service.finishProgress();
      });
    }
  }

  cancelar() {
    history.back();
  }

  guardar() {
    let detalle = this.items.filter((item: any) =>
      item.nombreToro != null &&
      item.numeroToro != null &&
      item.razaToro != null);
    this.objeto.detalleFormatos = detalle;
    this.objeto.tipoFormato = "TORO";
    if (!this.objeto.fecha || !this.objeto.departamento || !this.objeto.municipio || !this.objeto.nombreFinca) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Faltan datos por ingresar por favor verifica' });
    } else {
      if (this.objeto.fecha.toString().includes('/')) {
        const [month, day, year] = this.objeto.fecha.split('/');

        const date = this.convertToLocalDate(day + '/' + month + '/' + year);
        this.objeto.fecha = date;
      }
      this.service.guardarFormatosBra(this.objeto).then(data => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Información guardada con exito' });
        history.back();
      }).catch(e => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al realizar la transacción, por favor verifica o intenta de nuevo' });
      })
    }
  }

  add() {
    this.items.push({});
  }

  remove(i: number) {
    this.items.splice(i, 1);
  }

  convertToLocalDate(responseDate: any) {
    try {
      if (responseDate != null) {
        if (typeof (responseDate) === 'string') {
          if (String(responseDate.indexOf('T') >= 0)) {
            responseDate = responseDate.split('T')[0];
          }
          if (String(responseDate.indexOf('+') >= 0)) {
            responseDate = responseDate.split('+')[0];
          }
        }

        responseDate = new Date(responseDate);
        const newDate = new Date(responseDate.getFullYear(), responseDate.getMonth(), responseDate.getDate(), 0, 0, 0);
        const userTimezoneOffset = newDate.getTimezoneOffset() * 60000;

        const finalDate: Date = new Date(newDate.getTime() - userTimezoneOffset);
        return finalDate;
      } else {
        return null;
      }
    } catch (error) {
      return responseDate;
    }
  }
}
