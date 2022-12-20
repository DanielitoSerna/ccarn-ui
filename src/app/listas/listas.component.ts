import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppService } from 'src/app/app.services';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss']
})
export class ListasComponent implements OnInit {

  @Input() tipo:any = undefined;
  public datos = [];
  public text = '';
  public count = 1;
  public rows = 10;
  public viewForm = false;
  public objeto:any = {};
  public nombrePredio = undefined;
  public fecha = undefined;
  public concepto = undefined;
  public url: any = undefined;
  public fechaF = undefined;
  public municipio = undefined;
  public nombreFinca = undefined;
  public empresaGanadera = undefined;

  public isLista = false;
  public scroll = '65vh';

  titulo = '';

  request: any = {
    tabla: '',
    campoOrden: 'fecha',
    orden: 'desc',
    where: '',
    cantidad: this.rows,
    pagina: 0
  }

  conceptos = [
    {label: "FAVORABLE", value: "FAVORABLE"},
    {label: "DESFAVORABLE", value: "DESFAVORABLE"},
  ];

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

  constructor(private service: AppService, private router: Router) {
  }

  ngOnInit() {
    this.definirDatos();
    this.listarDatos(true);
  }

  nuevo() {
    this.objeto = {};
    localStorage.setItem("objeto", JSON.stringify(this.objeto));
    this.router.navigate([this.url]);
  }

  editar(objeto: any) {
    this.objeto = objeto;
    localStorage.setItem("objeto", JSON.stringify(this.objeto));
    this.router.navigate([this.url]);
  }

  onPageChange(event: any) {
    this.request.cantidad = event.rows;
    this.request.pagina = (event.page * event.rows);
    this.listarDatos(false);
  }

  listarDatos(count: boolean) {
    this.service.initProgress();
    this.service.listarDatos(this.request).then(data => {
      this.datos = data;
      this.service.finishProgress();
    });
    if(count) {
      this.service.contarDatos(this.request).then(data => this.count = data);
    }
  }

  sortColumn(event: any) {
    let order = event.order == 1 ? 'ASC' : 'DESC';
    if(this.request.campoOrden != null && ( event.field.valueOf() != this.request.campoOrden || order.valueOf() != this.request.orden)){
      this.request.orden = order;
      this.request.campoOrden = event.field;
      
      this.request.pagina = 0;
      this.listarDatos(false);
    }
  }

  filter() {
    this.definirDatos();
    if(this.fecha != null) {
      const datepipe: DatePipe = new DatePipe('en-US')
      this.request.where = this.request.where + " and (listaChequeoBean.fecha = '" + datepipe.transform(this.fecha, 'YYYY-MM-dd') + "'";
      this.request.where = this.request.where + " or listaChequeoBean.fechaAuditoria = '" + datepipe.transform(this.fecha, 'YYYY-MM-dd') + "')";
    }

    if(this.nombrePredio != null) {
      this.request.where = this.request.where + " and upper(listaChequeoBean.nombrePredio) like upper('%" + this.nombrePredio + "%')";
    }

    if(this.concepto != null) {
      this.request.where = this.request.where + " and concepto = '" + this.concepto + "'";
    }

    if(this.fechaF != null) {
      const datepipe: DatePipe = new DatePipe('en-US')
      this.request.where = this.request.where + " and fecha = '" + datepipe.transform(this.fechaF, 'YYYY-MM-dd') + "'";
    }

    if(this.municipio != null) {
      this.request.where = this.request.where + " and municipio = '" + this.municipio + "'";
    }

    if(this.nombreFinca != null && this.url != '/caracterizacion') {
      this.request.where = this.request.where + " and upper(nombreFinca) like upper('%" + this.nombreFinca + "%')";
    } else if(this.nombreFinca != null) {
      this.request.where = this.request.where + " and upper(nombrePredio) like upper('%" + this.nombreFinca + "%')";
    }

    if(this.empresaGanadera != null) {
      this.request.where = this.request.where + " and upper(empresaGanadera) like upper('%" + this.empresaGanadera + "%')";
    }

    this.listarDatos(true);
  }

  clean() {
    this.fecha = undefined;
    this.concepto = undefined;
    this.nombrePredio = undefined;
    this.fechaF = undefined;
    this.nombreFinca = undefined;
    this.municipio = undefined;
    this.empresaGanadera = undefined;
    this.definirDatos();
    this.listarDatos(true);
  }

  definirDatos() {
    let url = undefined;
    if(this.tipo != undefined) {
      url = this.tipo;
      this.scroll = '53vh';
    } else {
      url =  this.router.url;
    }
    if(url == '/listasAsi') {
      this.request.tabla = 'ConceptoListaChequeo';
      this.request.campoOrden = 'listaChequeoBean.fecha';
      this.request.where = " listaChequeoBean.tipoFormato = 'ASI'";
      this.url = '/listaAsi';
      this.titulo = 'Listas de chequeo ASI';
    } else if(url == '/listasBgp') {
      this.request.tabla = 'ConceptoListaChequeo';
      this.request.campoOrden = 'listaChequeoBean.fecha';
      this.request.where = " listaChequeoBean.tipoFormato = 'BGP'";
      this.url = '/listaBgp';
      this.titulo = 'Listas de chequeo BPG';
    } else if(url == '/listasIatf') {
      this.request.tabla = 'Formato';
      this.request.campoOrden = 'fecha';
      this.request.where = " tipoFormato = 'IATF'";
      this.url = '/listaIatf';
      this.isLista = true;
      this.titulo = 'Registro hembras prot. IATF';
    } else if(url == '/listasBra') {
      this.request.tabla = 'Formato';
      this.request.campoOrden = 'fecha';
      this.request.where = " tipoFormato = 'BRA'";
      this.url = '/listaBra';
      this.isLista = true;
      this.titulo = 'Registro animales BRA';
    } else if(url == '/listasDonadoras') {
      this.request.tabla = 'Formato';
      this.request.campoOrden = 'fecha';
      this.request.where = " tipoFormato = 'DOND'";
      this.url = '/listaDonadoras';
      this.isLista = true;
      this.titulo = 'Listado donadoras';
    } else if(url == '/listasToro') {
      this.request.tabla = 'Formato';
      this.request.campoOrden = 'fecha';
      this.request.where = " tipoFormato = 'TORO'";
      this.url = '/listaToro';
      this.isLista = true;
      this.titulo = 'Listado Toros TE';
    } else if(url == '/listasEvaluacionAndrologica') {
      this.request.tabla = 'Formato';
      this.request.campoOrden = 'fecha';
      this.request.where = " tipoFormato = 'EVALUACION ANDROLOGICA'";
      this.url = '/evaluacionAndrologica';
      this.isLista = true;
      this.titulo = 'Evaluación Andrológica';
    } else if(url == '/listasTransferenciaEmbrion') {
      this.request.tabla = 'Formato';
      this.request.campoOrden = 'fecha';
      this.request.where = " tipoFormato = 'TRANSFERENCIA EMBRIONES'";
      this.url = '/transferenciaEmbrion';
      this.isLista = true;
      this.titulo = 'Registro hembras prot. PIVE';
    } else if(url == '/caracterizacion') {
      this.request.tabla = 'Caracterizacion';
      this.request.campoOrden = 'fecha';
      this.request.where = ' 1 = 1 ';
      this.url = '/caracterizacion';
      this.isLista = true;
      this.titulo = 'Caracterización';
    } else if(url == '/aspiraciones') {
      this.request.tabla = 'Formato';
      this.request.campoOrden = 'fecha';
      this.request.where = " tipoFormato = 'ASPIRACION'";
      this.url = '/aspiracion';
      this.isLista = true;
      this.titulo = 'Aspiración folicular';
    } else if(url == '/recomendaciones') {
      this.request.tabla = 'Formato';
      this.request.campoOrden = 'fecha';
      this.request.where = " tipoFormato = 'RECOMENDACIONES'";
      this.url = '/recomendacion';
      this.isLista = true;
      this.titulo = 'Recomendaciones';
    } else if(url == '/capacitaciones') {
      this.request.tabla = 'EncabezadoRegistro';
      this.request.campoOrden = 'empresaGanadera';
      this.request.where = " tipoFormato = 'CAPACITACION'";
      this.url = '/capacitacion';
      this.titulo = 'Registros de capacitaciones';
    } else if(url == '/veterinarios') {
      this.request.tabla = 'EncabezadoRegistro';
      this.request.campoOrden = 'empresaGanadera';
      this.request.where = " tipoFormato = 'VETERINARIO'";
      this.url = '/veterinario';
      this.titulo = 'Registros de tratamientos veterinarios';
    } else if(url == '/potreros') {
      this.request.tabla = 'EncabezadoRegistro';
      this.request.campoOrden = 'empresaGanadera';
      this.request.where = " tipoFormato = 'POTRERO'";
      this.url = '/potrero';
      this.titulo = 'Registros manejo de potreros';
    } else if(url == '/vehiculos') {
      this.request.tabla = 'EncabezadoRegistro';
      this.request.campoOrden = 'empresaGanadera';
      this.request.where = " tipoFormato = 'VEHICULO'";
      this.url = '/vehiculo';
      this.titulo = 'Registro control de personas y vehículos';
    }  
  }

  downloadCaracterizacion() {
    window.open(this.service.configUrl + '/caracterizacion-excel');
  }

  downloadBpg() {
    window.open(this.service.configUrl + '/bpg-excel');
  }

  downloadAsi() {
    window.open(this.service.configUrl + '/asi-excel');
  }

  downloadCapacitacion() {
    window.open(this.service.configUrl + '/capacitacion-excel');
  }

  downloadTratamiento() {
    window.open(this.service.configUrl + '/tratamiento-excel');
  }

  downloadPotrero() {
    window.open(this.service.configUrl + '/potrero-excel');
  }

  downloadPersona() {
    window.open(this.service.configUrl + '/personas-excel');
  }

  downloadRecomendaciones() {
    window.open(this.service.configUrl + '/recomendaciones-excel');
  }

  downloadBra() {
    window.open(this.service.configUrl + '/bra-excel');
  }

  downloadIatf() {
    window.open(this.service.configUrl + '/iatf-excel');
  }

  downloadAspiracion() {
    window.open(this.service.configUrl + '/aspiracion-excel');
  }

  downloadDonadoras() {
    window.open(this.service.configUrl + '/donadoras-excel');
  }

  downloadToros() {
    window.open(this.service.configUrl + '/toros-excel');
  }

  downloadHembras() {
    window.open(this.service.configUrl + '/hembras-excel');
  }

  downloadAndrologica() {
    window.open(this.service.configUrl + '/andrologica-excel');
  }
}


