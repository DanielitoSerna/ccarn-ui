import { Component } from '@angular/core';
import { AppService } from '../app.services';
import { MessageService } from 'primeng/api';
import { MomentPipe } from '../componentes/moment.pipe';

@Component({
  selector: 'app-aspiracionFolicular',
  templateUrl: './aspiracionFolicular.component.html',
  styleUrls: ['./aspiracionFolicular.component.scss']
})
export class AspiracionFolicularComponent {

  departamentos = [{ label: "Antioquia", value: "Antioquia" }];
  municipios = [
    { label: "Caracolí", value: "Caracolí" },
    { label: "Maceo", value: "Maceo" },
    { label: "Necoclí", value: "Necoclí" },
    { label: "Puerto Berrío", value: "Puerto Berrío" },
    { label: "Puerto Nare", value: "Puerto Nare" },
    { label: "Puerto Triunfo", value: "Puerto Triunfo" },
    { label: "Remedios", value: "Remedios" },
    { label: "Segovia", value: "Segovia" },
    { label: "Turbo", value: "Turbo" },
    { label: "Yondó", value: "Yondó" },
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

      this.objeto.horaInicio = new Date(this.objeto.horaInicio);
      this.objeto.horaFinal =  new Date(this.objeto.horaFinal);

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
        this.items.forEach((item: any) => {
          if (item.fecha != null) {
            item.fecha = MomentPipe.transform(item.fecha);
          }
          item.hora = new Date(item.hora);
          if (item.seleccionada == 1) {
            item.seleccionada = true;
          } else {
            item.seleccionada = false;
          }
        });
      });
    }
  }

  cancelar() {
    history.back();
  }

  guardar() {
    let detalle = this.items.filter((item: any) =>
      item.fecha != null ||
      item.hora != null ||
      item.nombreDonadora != null ||
      item.razaDonadora != null ||
      item.programacion != null ||
      item.nombreToro != null ||
      item.razaToro != null ||
      item.g1 != null ||
      item.g2 != null ||
      item.g2 != null ||
      item.g3 != null ||
      item.deg != null ||
      item.dx != null ||
      item.total);
    this.objeto.detalleFormatos = detalle;
    this.objeto.tipoFormato = "ASPIRACION";
    this.objeto.detalleFormatos.forEach((item: any) => {
      if (item.seleccionada) {
        item.seleccionada = 1;
      } else {
        item.seleccionada = 0;
      }
    });
    if (!this.objeto.fecha || !this.objeto.departamento || !this.objeto.municipio || !this.objeto.nombrePropietario || !this.objeto.nombreFinca) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Faltan datos por ingresar por favor verifica' });
    } else {
      if (this.objeto.fecha.toString().includes('/')) {
        const [month, day, year] = this.objeto.fecha.split('/');

        const date = this.convertToLocalDate(day + '/' + month + '/' + year);
        this.objeto.fecha = date;
      }
      this.objeto.detalleFormatos.forEach((element: any) => {
        if(element.fecha.toString().includes('/')) {
          const [month, day, year] = element.fecha.split('/');
  
          const date = this.convertToLocalDate(day+'/'+month+'/'+year);
          element.fecha = date;
        }
      });
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
