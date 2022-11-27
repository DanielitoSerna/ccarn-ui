import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { AppService } from "../app.services";

@Component({
    selector: 'app-evaluacionAndrologica',
    templateUrl: './evaluacionAndrologica.component.html',
    styleUrls: ['./evaluacionAndrologica.component.scss']
})
export class EvaluacionAndrologicaComponent {

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

    objeto: any = {
        detalleAndrologico: {}
    };

    constructor(private service: AppService, private messageService: MessageService) {
        let objeto:any = localStorage.getItem("objeto");
        objeto = JSON.parse(objeto ? objeto : '');
        this.objeto = objeto;
        if(objeto.id != undefined) {
            this.objeto.detalleAndrologico = {};
            
            this.objeto.fecha = new Date(this.objeto.fecha);

            let request = {
                tabla: 'DetalleAndrologico',
                campoOrden: 'id',
                orden: 'asc',
                where: 'formatoBean.id = ' + objeto.id,
                cantidad: 100,
                pagina: 0
              }
              this.service.initProgress();
              this.service.listarDatos(request).then(data => {
                this.objeto.detalleAndrologico = data[0];
                if(this.objeto.detalleAndrologico.fechaNacimiento != null) {
                    this.objeto.detalleAndrologico.fechaNacimiento = new Date(this.objeto.detalleAndrologico.fechaNacimiento);
                }
                this.service.finishProgress();
              });
        } else {
            this.objeto.detalleAndrologico = {};
        }
    }

    cancelar() {
        history.back();
    }

    guardar() {
        this.objeto.tipoFormato = 'EVALUACION ANDROLOGICA';
        if (!this.objeto.fecha || !this.objeto.departamento || !this.objeto.municipio || !this.objeto.nombrePropietario || !this.objeto.nombreFinca ) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Faltan datos por ingresar por favor verifica' });
        } else {
            this.service.guardarFormatosBra(this.objeto).then(data => {
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Información guardada con exito' });
                history.back();
            }).catch(e => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al realizar la transacción, por favor verifica o intenta de nuevo' });
            })
        }
    }

}