import { Component} from '@angular/core';
import { AppService } from '../app.services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recomendacion',
  templateUrl: './recomendacion.component.html',
  styleUrls: ['./recomendacion.component.scss']
})
export class RecomendacionComponent {

  objeto: any = {};

  constructor(private service: AppService, private messageService: MessageService) {
    let objeto:any = localStorage.getItem("objeto");
    objeto = JSON.parse(objeto ? objeto : '');
    this.objeto = objeto;
    if(objeto.id != undefined) {
      this.objeto.fecha = new Date(this.objeto.fecha);
    }
  }


  cancelar() {
    history.back();
  }

  guardar() {
    this.objeto.tipoFormato = "RECOMENDACIONES";
    if(!this.objeto.fecha || !this.objeto.numeroVisita || !this.objeto.recomendacion) {
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
