import {Component, Input, OnInit} from '@angular/core';
import {BierenService} from '../../../../../services/bieren.service';


@Component({
  selector: 'app-bier-item',
  templateUrl: './bier-item.component.html',
  styles: []
})
export class BierItemComponent implements OnInit {

  @Input() item: any;
  @Input() index: number;

  constructor(private bierenService: BierenService) { }

  ngOnInit() {
  }

}
