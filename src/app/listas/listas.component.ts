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
  public concepto = undefined;
  public fecha = undefined;
  public usuario = undefined;
  public url: any = undefined;

  request = {
    tabla: '',
    campoOrden: 'fecha',
    orden: 'desc',
    where: '',
    cantidad: this.rows,
    pagina: 0
  }

  constructor(private service: AppService, private router: Router) {
      const url =  this.router.url;
      if(url == '/listasAsi') {
        this.request.tabla = 'ListaChequeo';
        this.request.campoOrden = 'fecha';
        this.request.where = " tipoFormato = 'ASI'";
        this.url = '/listaAsi';
      } else if(url == '/listasBgp') {
        this.request.tabla = 'ListaChequeo';
        this.request.campoOrden = 'fecha';
        this.request.where = " tipoFormato = 'BGP'";
        this.url = '/listaBgp';
      } else if(url == '/listasIatf') {
        this.request.tabla = 'Formato';
        this.request.campoOrden = 'fecha';
        this.request.where = " tipoFormato = 'IATF'";
        this.url = '/listaIatf';
      } else if(url == '/listasDonadoras') {
        this.request.tabla = 'Formato';
        this.request.campoOrden = 'fecha';
        this.request.where = " tipoFormato = 'DOND'";
        this.url = '/listaDonadoras';
      } else if(url == '/listasToro') {
        this.request.tabla = 'Formato';
        this.request.campoOrden = 'fecha';
        this.request.where = " tipoFormato = 'TORO'";
        this.url = '/listaToro';
      }
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
    this.request.where = "empresa = '" + localStorage.getItem("empresa") + "' and tipo = 'OC' ";
    if(this.fecha != null) {
      const datepipe: DatePipe = new DatePipe('en-US')
      this.request.where = this.request.where + " and fecha = '" + datepipe.transform(this.fecha, 'YYYY-MM-dd') + "'";
    }

    if(this.concepto != null) {
      this.request.where = this.request.where + " and upper(descripcion) like upper('%" + this.concepto + "%')";
    }

    if(this.usuario != null) {
      this.request.where = this.request.where + " and upper(usuario) like upper('%" + this.usuario + "%')";
    }
    this.listarDatos(true);
  }

  clean() {
    this.fecha = undefined;
    this.usuario = undefined;
    this.concepto = undefined;
    this.request.where = "empresa = ''" + localStorage.getItem("empresa") + "' and tipo = 'OC'";
    this.listarDatos(true);
  }
}
