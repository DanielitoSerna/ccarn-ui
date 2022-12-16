import { Component } from '@angular/core';
import { AppService } from '../app.services';
import { MessageService } from 'primeng/api';
import { ThisReceiver } from '@angular/compiler';
import { MomentPipe } from '../componentes/moment.pipe';

@Component({
  selector: 'app-caracterizacion',
  templateUrl: './caracterizacion.component.html',
  styleUrls: ['./caracterizacion.component.scss']
})
export class CaracterizacionComponent {

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

  tipos = [
    { label: "Ninguna", value: "Ninguna" },
    { label: "Bachillerato", value: "Bachillerato" },
    { label: "Técnica", value: "Técnica" },
    { label: "Tecnológica", value: "Tecnológica" },
    { label: "Universitaria", value: "Universitaria" },
    { label: "Doctorado", value: "Doctorado" }
  ];

  items: any[] = [];
  options: any[] = [{ label: "SI", value: "SI" }, { label: "NO", value: "NO" }, { label: "NA", value: "NA" }]

  fundamentalNa = 0;
  fundamentalNo = 0;
  fundamentalSi = 0;

  mayorNa = 0;
  mayorNo = 0;
  mayorSi = 0;

  menorNa = 0;
  menorNo = 0;
  menorSi = 0;

  fundamentalP = 0;
  mayorP = 0;
  menorP = 0;

  concepto = '';

  objeto: any = {
    tipoIdentificacion: 'CC',
    actaCompromiso: true,
    asociadoAgremiacion: true,
    escolaridad: 'Analfabeta',
    genero: 'M',
    participaComponenteBiotecnologia: true,
    tenenciaPredio: 'Propia',
    estadoViaAcceso: 'Buena',
    tieneComputador: true,
    tieneInternet: true,
    usaSoftware: true,
    informacionTecnica: 'Cuaderno',
    nombreSoftware: 'Ganadero',
    fincaCertificada: true,
    fincaProcesoCertificacion: true,
    parametrosTecnicos: true,
    costoProduccionAnimales: true,
    tipoProduccion: 'Doble propósito',
    participaProyectoAnteriorGobernacion: true,
    participaProyectoAnteriorMinisterioAgricultura: true,
    asistenciaTecnica: true,
    mejoramientoGenetico: 'Mejoramiento genetico',
    sanidadAnimal: 'Sanidad animal',
    suplementa: true,
    cargoDentroPredio: 'Administrador',
    mapaFinca: true,
    concepto: {}
  };

  constructor(private service: AppService, private messageService: MessageService) {
    let objeto: any = localStorage.getItem("objeto");
    this.objeto = JSON.parse(objeto ? objeto : '');
    if (this.objeto.id != null) {
      this.objeto.fecha = MomentPipe.transform(this.objeto.fecha);
      if (this.objeto.fechaNacimiento != null) {
        this.objeto.fechaNacimiento = MomentPipe.transform(this.objeto.fechaNacimiento);
      }
    }
  }

  cancelar() {
    history.back();
  }

  guardar() {
    if (this.objeto.fecha == null || this.objeto.numeroCaracterizaacion == null || this.objeto.numeroCaracterizaacion == null || this.objeto.nombrePredio == null || this.objeto.departamento == null || this.objeto.municipio == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Faltan datos por ingresar, por favor verifica' });
    } else {
      if (this.objeto.fecha != null) {
        if (this.objeto.fecha.toString().includes('/')) {
          const [month, day, year] = this.objeto.fecha.split('/');
  
          const date = this.convertToLocalDate(day + '/' + month + '/' + year);
          this.objeto.fecha = date;
        }
      }
      if (this.objeto.fechaNacimiento != null) {
        if (this.objeto.fechaNacimiento.toString().includes('/')) {
          const [month, day, year] = this.objeto.fechaNacimiento.split('/');
  
          const date = this.convertToLocalDate(day + '/' + month + '/' + year);
          this.objeto.fechaNacimiento = date;
        }
      }
      this.service.guardarCaracterizacion(this.objeto).then(data => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Información guardada con exito' });
        history.back();
      }).catch(e => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al realizar la transacción, por favor verifica o intenta de nuevo' });
      });

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
