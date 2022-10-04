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

    objeto = {};

    items = [
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}
    ];

    constructor(private service: AppService, private messageService: MessageService) {

    }


    cancelar() {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al realizar la transación, verifica los datos ingresados o comunícate con el administrador del sistema' });
    }

    guardar() {

    }

}