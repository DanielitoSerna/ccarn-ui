import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { AppService } from "../app.services";
import { MomentPipe } from "../componentes/moment.pipe";

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
        { label: "Necoclí", value: "Necoclí" },
        { label: "Puerto Berrío", value: "Puerto Berrío" },
        { label: "Puerto Nare", value: "Puerto Nare" },
        { label: "Puerto Triunfo", value: "Puerto Triunfo" },
        { label: "Remedios", value: "Remedios" },
        { label: "Segovia", value: "Segovia" },
        { label: "Turbo", value: "Turbo" },
        { label: "Yondó", value: "Yondó" },
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
            
            this.objeto.fecha = MomentPipe.transform(this.objeto.fecha);

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
                    this.objeto.detalleAndrologico.fechaNacimiento = MomentPipe.transform(this.objeto.detalleAndrologico.fechaNacimiento);
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
            if (this.objeto.fecha != null) {
                if (this.objeto.fecha.toString().includes('/')) {
                    const [month, day, year] = this.objeto.fecha.split('/');
    
                    const date = this.convertToLocalDate(day + '/' + month + '/' + year);
                    this.objeto.fecha = date;
                }
            }
            if (this.objeto.detalleAndrologico.fechaNacimiento != null ) {
                if (this.objeto.detalleAndrologico.fechaNacimiento.toString().includes('/')) {
                    const [month, day, year] = this.objeto.detalleAndrologico.fechaNacimiento.split('/');
    
                    const date = this.convertToLocalDate(day + '/' + month + '/' + year);
                    this.objeto.detalleAndrologico.fechaNacimiento = date;
                }
            }
            this.service.guardarFormatosBra(this.objeto).then(data => {
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Información guardada con exito' });
                history.back();
            }).catch(e => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al realizar la transacción, por favor verifica o intenta de nuevo' });
            })
        }
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