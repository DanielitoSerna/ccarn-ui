import { Component} from '@angular/core';
import { AppService } from '../app.services';
import { MessageService } from 'primeng/api';
import { MomentPipe } from '../componentes/moment.pipe';

@Component({
  selector: 'app-veterinario',
  templateUrl: './veterinario.component.html',
  styleUrls: ['./veterinario.component.scss']
})
export class VeterinarioComponent {

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
              if(element.fechaInicioTratamiento != null) {
                element.fechaInicioTratamiento = MomentPipe.transform(element.fechaInicioTratamiento);
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
      item.fechaInicioTratamiento != null ||
      item.idAnimal != null ||
      item.nombreMedicamento != null ||
      item.laboratorio != null ||
      item.lote != null ||
      item.registroIca != null ||
      item.dosis != null ||
      item.viaAplicacion != null ||
      item.duracion != null ||
      item.tiempoRetiro != null ||
      item.responsable != null);
    this.objeto.registros = detalle;
    this.objeto.tipoFormato = "VETERINARIO";
    if(!this.objeto.empresaGanadera || !this.objeto.municipio) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Faltan datos por ingresar por favor verifica'});
    } else {

      this.objeto.registros.forEach((element: any) => {
        if(element.fechaInicioTratamiento.toString().includes('/')) {
          const [month, day, year] = element.fechaInicioTratamiento.split('/');
  
          const date = this.convertToLocalDate(day+'/'+month+'/'+year);
          element.fechaInicioTratamiento = date;
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
