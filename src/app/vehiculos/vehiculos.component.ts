import { Component} from '@angular/core';
import { AppService } from '../app.services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent {


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
              if(element.fechaIngresoPersona != null) {
                element.fechaIngresoPersona = new Date(element.fechaIngresoPersona);
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
      item.fechaIngresoPersona != null &&
      item.nombreIngresoPersona != null &&
      item.identificacionIngresoPersona != null &&
      item.telefonoIngresoPersona != null &&
      item.producto != null &&
      item.procedenciaIngresoPersona != null &&
      item.motivoVisita != null);
    this.objeto.registros = detalle;
    this.objeto.tipoFormato = "VEHICULO";
    if(!this.objeto.empresaGanadera || !this.objeto.municipio || detalle.length == 0) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Faltan datos por ingresar por favor verifica'});
    } else {
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
}
