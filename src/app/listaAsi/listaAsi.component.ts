import { Component} from '@angular/core';
import { AppService } from '../app.services';
import { MessageService } from 'primeng/api';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-listaAsi',
  templateUrl: './listaAsi.component.html',
  styleUrls: ['./listaAsi.component.scss']
})
export class ListaAsiComponent {

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
    concepto : {}
  };

  constructor(private service: AppService, private messageService: MessageService) {

    let objeto:any = localStorage.getItem("objeto");
    objeto = JSON.parse(objeto ? objeto : '');
    if(objeto.id == undefined) {
      this.objeto.objeto = 'Autorización';

      this.items.push({objetivo: "1. Cumple con las vacunaciones contra las enfermedades de control oficial de conformidad con la normatividad vigente establecida por el ICA.", tipoCriterio: "Fundamental"});
      this.items.push({objetivo: "2. Se utilizan únicamente productos veterinarios con Registro ICA, se evita el uso de sustancias prohibidas.", tipoCriterio: "Fundamental"});
      this.items.push({objetivo: "4. Los animales enfermos se  tratan oportunamente, se evita la presencia de lesiones y/o enfermedades. Los animales enfermos con signos clínicos de enfermedades de control oficial son notificados al ICA.", tipoCriterio: "Fundamental"});
      this.items.push({objetivo: "3. Los alimentos comerciales para animales cuentan con registro ICA.", tipoCriterio: "Fundamental"});
      this.items.push({objetivo: "5. Se evita el dolor y sufrimiento a los animales, y cuando no sea posible, se aplican mecanismos para disminuir el dolor y sufrimiento. Se aplica anestesia y analgesia cuando se realizan intervenciones quirúrgicas.", tipoCriterio: "Fundamental"});
      this.items.push({objetivo: "6. Se presentan comportamientos normales en los animales.", tipoCriterio: "Fundamental"});
      this.items.push({objetivo: "7. Se observa relación positiva humano-animal.", tipoCriterio: "Fundamental"});
      this.items.push({objetivo: "8. Cuenta con un plan sanitario.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "9. Se identifican los animales de forma individual o por lotes, de acuerdo a la especie.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "10. Se clasifican, almacenan y disponen los residuos peligrosos, mortalidades y desechos anatomopatológicos de manera que no generen riesgos sanitarios, ni de inocuidad.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "11.  Se encuentra aislamiento de la zona de producción que permiten delimitar e impidan el paso de animales, personas y vehículos..", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "12. En ordeños fijos: La Sala de ordeño esta en buen estado que facilite su limpieza y desinfección.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "13. En ordeño móvil en potrero: Hay suficiente iluminación, con medidas que permiten la disminución de riesgo de contaminación de la leche desde el sitio de ordeño, al sitio de refrigeración o al sitio de entrega.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "14. Se realiza una rutina de ordeño en condiciones que garanticen la sanidad de la ubre y que evite la contaminación de la leche.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "15. El tanque de enfriamiento de leche se encuentra en un cuarto y éste permanece cerrado, no permite el ingreso de animales y es utilizado únicamente para dicho fin.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "16. Los pisos, paredes y techos del cuarto del tanque de enfriamiento están en buen estado y son de fácil limpieza y desinfección.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "17. Si no cuenta con tanque de enfriamiento de leche, se garantiza que la leche sea almacenada en condiciones higiénicas hasta su recolección.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "18. Lleva registro de tratamientos veterinarios realizados en el predio.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "19. Se prescriben los medicamentos por un Médico Veterinario o Médico Veterinario Zootecnista con matricula profesional vigente.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "20. Los productos veterinarios utilizados en el predio tienen fecha de vencimiento vigente.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "21. Cumple con el tiempo de retiro consignado en el rotulado del producto, cuando corresponda.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "22. Dispone de áreas, contenedores y/o instalaciones para el almacenamiento separado de medicamentos y biológicos veterinarios,  fertilizantes, plaguicidas, equipos y/o herramientas.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "23. Excluye de la alimentación de los animales productos o subproductos de cosecha de cultivos ornamentales, leche de retiro, excretas, y desechos de alimentación humana (lavazas).", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "24. Se emplean insumos agrícolas con registro ICA en los forrajes y cultivos destinados a la alimentación de los animales, y se respetan los periodos de carencia cuando corresponda.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "25. Se almacenan los alimentos para animales, suplementos nutricionales y sales mineralizadas en condiciones que prevengan su deterioro, contaminación y la proliferación de plagas.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "26. Si disponen de bebederos, estos deben ser funcionales, asegurar y permitir el acceso a voluntad de los animales de forma permanente, son de materiales que facilitan su limpieza, desinfección y permanecen limpios y en buen estado.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "27. Si disponen de comederos, estos deben ser funcionales, son de materiales que facilitan su limpieza, desinfección y permanecen limpios y en buen estado.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "28. El alojamiento  permite  el confort térmico de los animales.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "29. El personal encargado del manejo de los animales está capacitado o entrenado en temas relacionados con sanidad animal, inocuidad y  bienestar animal. Se puede verificar por entrevista al personal del predio y  soportes escritos.", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "30. Las Instalaciones (corrales, bretes, bascula, embudo, pesebreras, etc.) se encuentran en buen estado?", tipoCriterio: "Mayor"});
      this.items.push({objetivo: "31.  Disponen de manejo de los residuos sólidos y líquidos en el predio.  Se evita la acumulación de residuos orgánicos, escombros, maquinaria y equipos en desuso.", tipoCriterio: "Menor"});
      this.items.push({objetivo: "32. Si se cuenta con tanques para el almacenamiento del agua, están construidos con materiales que facilitan su limpieza y desinfección. Están tapados y limpios.", tipoCriterio: "Menor"});
      this.items.push({objetivo: "33. Se encuentra registro de ingreso de personas y vehículos y actividades que minimizan el riesgo de enfermedades.", tipoCriterio: "Menor"});
      this.items.push({objetivo: "34. La zona de espera antes del ordeño permanece en condiciones higiénicas adecuadas.", tipoCriterio: "Menor"});
      this.items.push({objetivo: "35. En ordeño fijo: Sistema de iluminación y ventilación apropiado que garantice un buen desempeño de las actividades.", tipoCriterio: "Menor"});
      this.items.push({objetivo: "36.  En ordeño móvil en potrero, el sitio está protegido de la intemperie y evita que otros animales tengan acceso durante el ordeño y cuando no esté en uso.", tipoCriterio: "Menor"});
      this.items.push({objetivo: "37. Las jeringas y agujas están en buen estado. Las agujas utilizadas se desechan tras su empleo en un recipiente seguro o guardián.", tipoCriterio: "Menor"});
      this.items.push({objetivo: "38. Se utilizan productos veterinarios como promotores de crecimiento únicamente cuando el registro ICA expresamente autorice su uso.", tipoCriterio: "Menor"});
      this.items.push({objetivo: "39. La aplicación, uso y manejo de estiércol y efluentes utilizados como abonos en pastizales y cultivos destinados a la alimentación de los animales evitan la contaminación ambiental y riesgo biológico.", tipoCriterio: "Menor"});
      this.items.push({objetivo: "40. Las superficies que utilizan los animales para descansar y/o caminar, disminuye el riesgo de heridas, permite el descanso confortable, movimientos seguros y posturas normales propias de la especie.", tipoCriterio: "Menor"});
    
    } else {
      this.objeto = objeto.listaChequeoBean;      
      this.objeto.fecha = new Date(this.objeto.fecha);
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

    this.fundamentalP = this.fundamentalSi / 7;
    this.mayorP = this.mayorSi / 23;
    this.menorP = this.menorSi / 10;

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

    this.objeto.concepto.porcentajeCumplimientoFundamental =  this.fundamentalP;
    this.objeto.concepto.porcentajeCumplimientoMayor =  this.mayorP;
    this.objeto.concepto.porcentajeCumplimientoMenor =  this.menorP;

    this.objeto.concepto.totalCriterioFundamental =  7;
    this.objeto.concepto.totalCriterioMayor =  23;
    this.objeto.concepto.totalCriterioMenor =  10;
  }

  contarCriterios(tipo:string, valor:string) {
    let items = this.items.filter(item => item.tipoCriterio == tipo && item.calificacion == valor);
    return items.length;
  }

  cancelar() {
    history.back();
  }

  guardar() {
    let error = this.items.filter(item => item.calificacion == null);
    if(error.length > 0) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Faltan datos por ingresar, por favor verifica'});
    } else {
      this.objeto.detalle = this.items;
      this.objeto.tipoFormato = "ASI";
      this.service.guardarEncabezado(this.objeto).then(data => {
        this.messageService.add({severity:'success', summary: 'Exito', detail: 'Información guardada con exito'});
      }).catch(e => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Ocurrio un error al realizar la transacción, por favor verifica o intenta de nuevo'});
      });
      
    }
  }
}
