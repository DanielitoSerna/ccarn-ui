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

    items: any = [
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}
    ];

    constructor(private service: AppService, private messageService: MessageService) {

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