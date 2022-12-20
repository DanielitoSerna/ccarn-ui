import { Component} from '@angular/core';
import { AppService } from '../app.services';
import { MessageService } from 'primeng/api';
import { MomentPipe } from '../componentes/moment.pipe';

@Component({
  selector: 'app-potrero',
  templateUrl: './potrero.component.html',
  styleUrls: ['./potrero.component.scss']
})
export class PotreroComponent {

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

  items:any[] = [{}];


  constructor(private service: AppService, private messageService: MessageService) {
    let objeto:any = localStorage.getItem("objeto");
    objeto = JSON.parse(objeto ? objeto : '');
    this.objeto = objeto;
    if(objeto.id != undefined) {
        let request = {
            tabla: 'Registro',
            campoOrden: 'id',
            orden: 'asc',
            where: 'encabezadoRegistroBean.id = ' + objeto.id,
            cantidad: 100,
            pagina: 0
          }
          this.service.initProgress();
          this.service.listarDatos(request).then(data => {
            this.items = data;
            this.items.forEach(element => {
              if(element.fechaIngreso != null) {
                element.fechaIngreso = MomentPipe.transform(element.fechaIngreso);
              }
              if(element.fechaSalida != null) {
                element.fechaSalida = MomentPipe.transform(element.fechaSalida);
              }
              if(element.fechaFertilizacion != null) {
                element.fechaFertilizacion = MomentPipe.transform(element.fechaFertilizacion);
              }
              if(element.fechaPlaguicida != null) {
                element.fechaPlaguicida = MomentPipe.transform(element.fechaPlaguicida);
              }
            });
            this.service.finishProgress();
          });
    }
  }

  cancelar() {
    history.back();
  }

  guardar() {
    let detalle = this.items.filter((item: any) => 
      item.fechaIngreso != null ||
      item.fechaSalida != null ||
      item.numeroAnimales != null ||
      item.periodoDescanso != null ||
      item.fechaFertilizacion != null ||
      item.cantidadFertilizacion != null ||
      item.productoFertilizacion != null ||
      item.fechaPlaguicida != null ||
      item.cantidadPlaguicida != null ||
      item.productoPlaguicida != null ||
      item.carenciaPlaguicida != null ||
      item.observaciones != null);
    this.objeto.registros = detalle;
    this.objeto.tipoFormato = "POTRERO";
    if(!this.objeto.empresaGanadera || !this.objeto.municipio || !this.objeto.potrero) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Faltan datos por ingresar por favor verifica'});
    } else {
      this.objeto.registros.forEach((element: any) => {
        if(element.fechaIngreso.toString().includes('/')) {
          const [month, day, year] = element.fechaIngreso.split('/');
  
          const date = this.convertToLocalDate(day+'/'+month+'/'+year);
          element.fechaIngreso = date;
        }
        if(element.fechaSalida.toString().includes('/')) {
          const [month, day, year] = element.fechaSalida.split('/');
  
          const date = this.convertToLocalDate(day+'/'+month+'/'+year);
          element.fechaSalida = date;
        }
        if(element.fechaPlaguicida.toString().includes('/')) {
          const [month, day, year] = element.fechaPlaguicida.split('/');
  
          const date = this.convertToLocalDate(day+'/'+month+'/'+year);
          element.fechaPlaguicida = date;
        }
        if(element.fechaFertilizacion.toString().includes('/')) {
          const [month, day, year] = element.fechaFertilizacion.split('/');
  
          const date = this.convertToLocalDate(day+'/'+month+'/'+year);
          element.fechaFertilizacion = date;
        }
      });

      this.service.guardarRegistro(this.objeto).then(data => {
        this.messageService.add({severity:'success', summary: 'Exito', detail: 'Información guardada con exito'});
        history.back();
      }).catch(e => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Ocurrio un error al realizar la transacción, por favor verifica o intenta de nuevo'});
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
