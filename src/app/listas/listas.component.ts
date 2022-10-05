import {Component, OnDestroy, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppService } from 'src/app/app.services';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss']
})
export class ListasComponent implements OnInit {

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

  public isLista = false;

  request = {
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
      this.definirDatos();
      this.listarDatos(true);
  }

  ngOnInit() {
    
  }

  nuevo() {
    this.objeto = {};
    this.router.navigate([this.url]);
  }

  editar(objeto: any) {
    this.objeto = objeto;
    this.objeto.fecha = new Date(this.objeto.fecha);
    this.viewForm = true;
  }

  onPageChange(event: any) {
    this.request.cantidad = event.rows;
    this.request.pagina = event.page;
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

    if(this.nombreFinca != null) {
      this.request.where = this.request.where + " and upper(nombreFinca) like upper('%" + this.nombreFinca + "%')";
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
    this.definirDatos();
    this.listarDatos(true);
  }

  definirDatos() {
    const url =  this.router.url;
    if(url == '/listasAsi') {
      this.request.tabla = 'ConceptoListaChequeo';
      this.request.campoOrden = 'listaChequeoBean.fecha';
      this.request.where = " listaChequeoBean.tipoFormato = 'ASI'";
      this.url = '/listaAsi';
    } else if(url == '/listasBgp') {
      this.request.tabla = 'ConceptoListaChequeo';
      this.request.campoOrden = 'listaChequeoBean.fecha';
      this.request.where = " listaChequeoBean.tipoFormato = 'BGP'";
      this.url = '/listaBgp';
    } else if(url == '/listasIatf') {
      this.request.tabla = 'Formato';
      this.request.campoOrden = 'fecha';
      this.request.where = " tipoFormato = 'IATF'";
      this.url = '/listaIatf';
      this.isLista = true;
    } else if(url == '/listasDonadoras') {
      this.request.tabla = 'Formato';
      this.request.campoOrden = 'fecha';
      this.request.where = " tipoFormato = 'DOND'";
      this.url = '/listaDonadoras';
      this.isLista = true;
    } else if(url == '/listasToro') {
      this.request.tabla = 'Formato';
      this.request.campoOrden = 'fecha';
      this.request.where = " tipoFormato = 'TORO'";
      this.url = '/listaToro';
      this.isLista = true;
    }
  }
}


