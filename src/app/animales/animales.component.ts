import { Component } from '@angular/core';
import { AppService } from '../app.services';
import { MessageService } from 'primeng/api';
import { MomentPipe } from '../componentes/moment.pipe';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.scss']
})
export class AnimalesComponent {

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
      let request = {
        tabla: 'DetalleTrazabilidad',
        campoOrden: 'id',
        orden: 'asc',
        where: 'trazabilidadBean.id = ' + objeto.id,
        cantidad: 100,
        pagina: 0
      }
      this.service.initProgress();
      this.service.listarDatos(request).then(data => {
        this.items = data;
        this.service.finishProgress();
        this.items.forEach((item: any) => {
          item.fechaNacimiento = MomentPipe.transform(item.fechaNacimiento);
        });
      });
    }
  }

  cancelar() {
    history.back();
  }

  guardar() {
    let detalle = this.items.filter((item: any) =>
      item.codigoInterno != null ||
      item.din != null ||
      item.dinMadre != null ||
      item.dinPadre != null ||
      item.fechaNacimiento ||
      item.numeroTrabajo ||
      item.raza ||
      item.sexo);
      detalle.forEach((element : any) => {
        if(element.fechaNacimiento.toString().includes('/')) {
          const [month, day, year] = element.fechaNacimiento.split('/');
  
          const date = this.convertToLocalDate(day+'/'+month+'/'+year);
          element.fechaNacimiento = date;
        }
      });
    this.objeto.detalleTrazabilidad = detalle;
    if (!this.objeto.departamento || !this.objeto.municipio || !this.objeto.nombreGanadero || !this.objeto.nombrePredio) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Faltan datos por ingresar por favor verifica' });
    } else {
      this.service.guardarTrazabilidad(this.objeto).then(data => {
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
