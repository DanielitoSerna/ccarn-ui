import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    public configUrl = "https://ccarn-prod.herokuapp.com/api";
    constructor(private http: HttpClient) {}

    isProgress(): boolean {
        return localStorage.getItem('cargando') != null && localStorage.getItem('cargando') != undefined;
    }

    initProgress() {
        localStorage.setItem('cargando', 'true');
    }

    finishProgress() {
        localStorage.removeItem('cargando');
    }

    listarDatos(request: any): Promise<any>{
        return this.http.post(`${this.configUrl}/listarDatos`, request).toPromise();
    }

    contarDatos(request: any): Promise<any>{
        return this.http.post(`${this.configUrl}/contarDatos`, request).toPromise();
    }

    guardarEncabezado(request: any): Promise<any>{
        return this.http.post(`${this.configUrl}/guardarEncabezado`, request).toPromise();
    }

    listarUsuario(usuario: any): Promise<any>{
        return this.http.get(`${this.configUrl}/listarUsuario?usuario=` + usuario).toPromise();
    }

    guardarFormatosBra(request: any): Promise<any> {
        return this.http.post(`${this.configUrl}/guardarFormato`, request).toPromise();
    }

    guardarRegistro(request: any): Promise<any> {
        return this.http.post(`${this.configUrl}/guardarRegistro`, request).toPromise();
    }

    guardarCaracterizacion(request: any): Promise<any> {
        return this.http.post(`${this.configUrl}/guardarCaracterizacion`, request).toPromise();
    }

    guardarTrazabilidad(request: any): Promise<any> {
        return this.http.post(`${this.configUrl}/trazabilidad`, request).toPromise();
    }
}
