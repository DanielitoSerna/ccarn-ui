import { Component} from '@angular/core';
import { AppService } from '../app.services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-aspiracionFolicular',
  templateUrl: './aspiracionFolicular.component.html',
  styleUrls: ['./aspiracionFolicular.component.scss']
})
export class AspiracionFolicularComponent {

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
    let objeto:any = localStorage.getItem("objeto");
    objeto = JSON.parse(objeto ? objeto : '');
    this.objeto = objeto;
    if(objeto.id != undefined) {

      this.objeto.fecha = new Date(this.objeto.fecha);

      this.objeto.horaInicio = new Date(this.objeto.horaInicio);
      this.objeto.horaFinal = new Date(this.objeto.horaFinal);
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
            if(item.fecha  != null) {
              item.fecha = new Date(item.fecha);
            }
            item.hora = new Date(item.hora);
            if(item.seleccionada == 1) {
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
      item.fecha != null &&
      item.hora != null &&
      item.nombreDonadora != null &&
      item.razaDonadora != null &&
      item.programacion != null &&
      item.nombreToro != null &&
      item.razaToro != null &&
      item.g1 != null &&
      item.g2 != null &&
      item.g2 != null &&
      item.g3 != null &&
      item.deg != null &&
      item.dx != null &&
      item.total);
    this.objeto.detalleFormatos = detalle;
    this.objeto.tipoFormato = "ASPIRACION";
    this.objeto.detalleFormatos.forEach((item: any) => {
      if(item.seleccionada) {
        item.seleccionada = 1;
      } else {
        item.seleccionada = 0;
      }
    });
    if(!this.objeto.fecha || !this.objeto.departamento || !this.objeto.municipio || !this.objeto.nombrePropietario || !this.objeto.nombreFinca || detalle.length == 0) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Faltan datos por ingresar por favor verifica'});
    } else {
      this.service.guardarFormatosBra(this.objeto).then(data => {
        this.messageService.add({severity:'success', summary: 'Exito', detail: 'Información guardada con exito'});
        history.back();
      }).catch(e => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Ocurrio un error al realizar la transacción, por favor verifica o intenta de nuevo'});
      })
    }
  }
}
