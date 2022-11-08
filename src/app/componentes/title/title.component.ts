import {Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'cmd-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() text = '';
  @Input() arrowLef = true;

  constructor(
    private _location: Location
  ) {
  }

  ngOnInit(): void {
  }

  goBack(){
    this._location.back();
  }

}
