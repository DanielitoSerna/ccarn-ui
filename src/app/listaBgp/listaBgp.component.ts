import { Component} from '@angular/core';
import { AppService } from '../app.services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-listaBgp',
  templateUrl: './listaBgp.component.html',
  styleUrls: ['./listaBgp.component.scss']
})
export class ListaBgpComponent {

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
  items:any[] = [];
  options:any[] = [{label:"SI", value:"SI"},{label:"NO", value:"NO"}, {label:"NA", value:"NA"}]

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
    concepto : {

    }
  };

  constructor(private service: AppService, private messageService: MessageService) {


    let objeto:any = localStorage.getItem("objeto");
    objeto = JSON.parse(objeto ? objeto : '');
    if(objeto.id == undefined) {
      this.objeto.tipoVisita = 'Certificación';

      this.items.push({numeral: 1, objetivo: "SANIDAD ANIMAL", header: true});
      this.items.push({numeral: 1.1,objetivo: "Plan sanitario y enfermedades de control oficial", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 1.2,objetivo: "Certificado de hato libre de brucella y tuberculosis", tipoCriterio: "Mayor"});
      this.items.push({numeral: 1.3,objetivo: "Protocolo de manejo y aislamiento de animales enfermos", tipoCriterio: "Mayor"});
      this.items.push({numeral: 1.4,objetivo: "Protocolo de manejo y aislamiento de animales enfermos", tipoCriterio: "Mayor"});
      this.items.push({numeral: 1.5,objetivo: "Instructivo de manejo sanitario sobre enfermedades de control oficial", tipoCriterio: "Mayor"});
      this.items.push({numeral: 1.6,objetivo: "Área o potrero de enfermería o tratamiento", tipoCriterio: "Mayor"});
      this.items.push({numeral: 2, objetivo: "IDENTIFICACIÓN", header: true});
      this.items.push({numeral: 2.1,objetivo: "Identificación de los animales", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 2.2,objetivo: "Registro o ficha individual o por lotes", tipoCriterio: "Mayor"});
      this.items.push({numeral: 3,objetivo: "BIOSEGURIDAD", header: true});
      this.items.push({numeral: 3.1,objetivo: "Delimitación del predio", tipoCriterio: "Mayor"});
      this.items.push({numeral: 3.2,objetivo: "Registro de ingreso de personas y vehículos", tipoCriterio: "Mayor"});
      this.items.push({numeral: 3.3,objetivo: "Cuarentena", tipoCriterio: "Mayor"});
      this.items.push({numeral: 3.4,objetivo: "Protocolo de ingreso del material genético", tipoCriterio: "Menor"});
      this.items.push({numeral: 3.5,objetivo: "Identificación de áreas", tipoCriterio: "Menor"});
      this.items.push({numeral: 4, objetivo: "REQUISITOS DE BUENAS PRÁCTICAS PARA EL USO DE MEDICAMENTOS VETERINARIOS –BPMV.", header: true});
      this.items.push({numeral: 4.1,objetivo: "Registro ICA de los productos veterinarios", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 4.2,objetivo: "Vigencia de los productos veterinarios", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 4.3,objetivo: "Almacenamiento de los productos veterinarios", tipoCriterio: "Mayor"});
      this.items.push({numeral: 4.4,objetivo: "Sustancias prohibidas", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 4.5,objetivo: "No utilizar materias primas de naturaleza química con fines terapéuticos o como promotores de crecimiento", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 4.6,objetivo: "Tiempo de retiro de medicamentos veterinarios", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 4.7,objetivo: "Prescripción veterinaria de los medicamentos", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 4.8,objetivo: "Registros de tratamientos veterinarios", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 4.9,objetivo: "Equipos para la reproducción y administración de medicamentos y biológicos veterinarios", tipoCriterio: "Mayor"});
      this.items.push({numeral: 4.10,objetivo: "Inventario de productos veterinarios", tipoCriterio: "Mayor"});
      this.items.push({numeral: 4.11,objetivo: "Autorización veterinaria de aplicación de medicamentos y realización de pequeñas intervenciones quirúrgicas", tipoCriterio: "Mayor"});
      this.items.push({numeral: 4.12,objetivo: "Notificación de eventos adversos", tipoCriterio: "Mayor"});
      this.items.push({numeral: 5, objetivo: "REQUISITOS DE BUENAS PRÁCTICAS PARA LA ALIMENTACIÓN ANIMAL –BPAA", header: true});
      this.items.push({numeral: 5.1,objetivo: "Registro ICA y buen estado de alimentos comerciales", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 5.2,objetivo: "Uso de alimentos como vehículo para la administración de medicamentos para animales", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 5.3,objetivo: "Prohibiciones alimentación animal", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 5.4,objetivo: "Uso de subproductos", tipoCriterio: "Mayor"});
      this.items.push({numeral: 5.5,objetivo: "Insumos agrícolas y periodo de carencia", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 5.6,objetivo: "Inventario de alimentos y materias primas", tipoCriterio: "Menor"});
      this.items.push({numeral: 5.7,objetivo: "Almacenamiento y calidad del agua para consumo de animales", tipoCriterio: "Mayor"});
      this.items.push({numeral: 6, objetivo: "REQUISITOS DE SANEAMIENTO", header: true});
      this.items.push({numeral: 6.1,objetivo: "Condición limpieza áreas, equipos y utensilios", tipoCriterio: "Mayor"});
      this.items.push({numeral: 6.2,objetivo: "El predio se encuentra ubicado en zonas alejadas de contaminación", tipoCriterio: "Mayor"});
      this.items.push({numeral: 6.3,objetivo: "Protección y conservación de fuentes hídricas", tipoCriterio: "Mayor"});
      this.items.push({numeral: 6.4,objetivo: "Disposición de estiércol y de efluentes", tipoCriterio: "Mayor"});
      this.items.push({numeral: 6.5,objetivo: "Manejo de residuos sólidos", tipoCriterio: "Mayor"});
      this.items.push({numeral: 6.6,objetivo: "Almacenamiento de productos agropecuarios, equipos y herramientas", tipoCriterio: "Mayor"});
      this.items.push({numeral: 6.7,objetivo: "Manejo de plagas y roedores", tipoCriterio: "Mayor"});
      this.items.push({numeral: 7, objetivo: "REQUISITOS DE BIENESTAR ANIMAL", header: true});
      this.items.push({numeral: 7.1,objetivo: "Adaptación de los animales", tipoCriterio: "Mayor"});
      this.items.push({numeral: 7.2,objetivo: "Superficies y espacio disponible", tipoCriterio: "Mayor"});
      this.items.push({numeral: 7.3,objetivo: "Agrupamiento social", tipoCriterio: "Mayor"});
      this.items.push({numeral: 7.4,objetivo: "Estabulación", tipoCriterio: "Mayor"});
      this.items.push({numeral: 7.5,objetivo: "Enfermedades y parásitos", tipoCriterio: "Mayor"});
      this.items.push({numeral: 7.6,objetivo: "Alimentos y agua", tipoCriterio: "Mayor"});
      this.items.push({numeral: 7.7,objetivo: "Sacrificio humanitario", tipoCriterio: "Mayor"});
      this.items.push({numeral: 7.8,objetivo: "Dolor y sufrimiento", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 7.9,objetivo: "Relación hombre - animal", tipoCriterio: "Mayor"});
      this.items.push({numeral: 8, objetivo: "REQUISITOS DE  PERSONAL", header: true});
      this.items.push({numeral: 8.1,objetivo: "Capacitación al personal", tipoCriterio: "Fundamental"});
      this.items.push({numeral: 8.2,objetivo: "Uso de implementos", tipoCriterio: "Menor"});
    } else {
      this.objeto = objeto.listaChequeoBean;      
      this.objeto.fechaAuditoria = new Date(this.objeto.fechaAuditoria);
      objeto.listaChequeoBean = undefined;
      this.objeto.concepto = objeto;

      let request = {
        tabla: 'DetalleListaChequeo',
        campoOrden: 'id',
        orden: 'asc',
        where: 'listaChequeoBean.id = ' + objeto.id,
        cantidad: 100,
        pagina: 0
      }
      this.service.initProgress();
      this.service.listarDatos(request).then(data => {
        this.items = data;
        this.service.finishProgress();
        this.calcularValores();
      });
    }

  }

  calcularValores() {
    this.fundamentalNa = this.contarCriterios("Fundamental", "NA");
    this.fundamentalSi = this.contarCriterios("Fundamental", "SI");
    this.fundamentalNo = this.contarCriterios("Fundamental", "NO");

    this.mayorNa = this.contarCriterios("Mayor", "NA");
    this.mayorSi = this.contarCriterios("Mayor", "SI");
    this.mayorNo = this.contarCriterios("Mayor", "NO");

    this.menorNa = this.contarCriterios("Menor", "NA");
    this.menorSi = this.contarCriterios("Menor", "SI");
    this.menorNo = this.contarCriterios("Menor", "NO");

    this.fundamentalP = this.fundamentalSi / 15;
    this.mayorP = this.mayorSi / 31;
    this.menorP = this.menorSi / 4;

    if(this.fundamentalP == 1 && this.mayorP >= 0.8 && this.menorP >= 0.6) {
      this.concepto = "FAVORABLE"
    } else {
      this.concepto = "DESFAVORABLE"
    } 

    this.objeto.concepto.concepto = this.concepto;
    this.objeto.concepto.criterioNoAplicaFundamental =  this.fundamentalNa;
    this.objeto.concepto.criterioNoAplicaMayor =  this.mayorNa;
    this.objeto.concepto.criterioNoAplicaMenor =  this.menorNa;

    this.objeto.concepto.criterioNoCumpleFundamental =  this.fundamentalNo;
    this.objeto.concepto.criterioNoCumpleMayor =  this.mayorNo;
    this.objeto.concepto.criterioNoCumpleMenor =  this.menorNo;

    this.objeto.concepto.criterioSiCumpleFundamental =  this.fundamentalSi;
    this.objeto.concepto.criterioSiCumpleMayor =  this.mayorSi;
    this.objeto.concepto.criterioSiCumpleMenor =  this.menorSi;

    this.objeto.concepto.criterioSiCumpleFundamental =  this.fundamentalSi;
    this.objeto.concepto.criterioSiCumpleMayor =  this.mayorSi;
    this.objeto.concepto.criterioSiCumpleMenor =  this.menorSi;

    this.objeto.concepto.totalCriterioFundamental =  15;
    this.objeto.concepto.totalCriterioMayor =  31;
    this.objeto.concepto.totalCriterioMenor =  4;

  }

  contarCriterios(tipo:string, valor:string) {
    let items = this.items.filter(item => item.tipoCriterio == tipo && item.calificacion == valor);
    return items.length;
  }

  cancelar() {
    history.back();
  }

  guardar() {
    let error = this.items.filter(item => item.calificacion == null && !item.header);
    if(error.length > 0) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Faltan datos por ingresar, por favor verifica'});
    } else {
      this.objeto.detalle = this.items.filter(item => !item.header);;
      this.objeto.tipoFormato = "BGP";
      this.service.guardarEncabezado(this.objeto).then(data => {
        this.messageService.add({severity:'success', summary: 'Exito', detail: 'Información guardada con exito'});
        history.back();
      }).catch(e => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Ocurrio un error al realizar la transacción, por favor verifica o intenta de nuevo'});
      });
      
    }
  }
}
