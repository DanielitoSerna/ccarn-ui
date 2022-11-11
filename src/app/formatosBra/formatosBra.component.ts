import { Component} from '@angular/core';

@Component({
  selector: 'app-formatos-bra',
  templateUrl: './formatosBra.component.html',
  styleUrls: ['./formatosBra.component.scss']
})
export class FormatosBraComponent {

  activeIndex = 0;

  constructor() {
    let activo = localStorage.getItem("PANEL_ACTIVO");
    if(activo != null) {
      this.activeIndex = +activo;
    }
  }

  tabChange($event:any) {
    localStorage.setItem("PANEL_ACTIVO", $event.index);
  }

}
