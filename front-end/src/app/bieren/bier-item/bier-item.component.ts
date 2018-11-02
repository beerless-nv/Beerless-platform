import {Component, Input, OnInit} from '@angular/core';
import {BierenService} from '../../services/bieren.service';

@Component({
  selector: 'app-bier-item',
  templateUrl: './bier-item.component.html',
  styles: []
})
export class BierItemComponent implements OnInit {

  @Input() item: { name: string, brewery: string, style: string, image: string };
  @Input() index: number;

  constructor(private bierenService: BierenService) { }

  ngOnInit() {
  }

}
