import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { AppService } from "../app.services";

@Component({
    selector: 'app-transferenciaEmbrion',
    templateUrl: './transferenciaEmbrion.component.html',
    styleUrls: ['./transferenciaEmbrion.component.scss']
})
export class TransferenciaEmbrionComponent {

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

    objeto: any = {};

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
        let detalle = this.items.filter((item: any) =>
            item.nombreDonadora != null &&
            item.razaDonadora != null &&
            item.nombreToro != null &&
            item.razaToro != null &&
            item.embrion != null &&
            item.receptora != null &&
            item.ovario != null &&
            item.p30 != null &&
            item.p60 != null &&
            item.sx != null
        );
        this.objeto.detalleFormatos = detalle;
        this.objeto.tipoFormato = 'TRANSFERENCIA EMBRIONES';
        if (!this.objeto.fecha || !this.objeto.empaqueEmbriones || !this.objeto.nombrePropietario || !this.objeto.transferidor || !this.objeto.nombreFinca || !this.objeto.horaInicio || !this.objeto.departamento || !this.objeto.horaFinal || !this.objeto.municipio || !this.objeto.profesionalProduccionInvitroEmbriones || detalle.length == 0) {
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