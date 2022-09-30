import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'cmed-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
