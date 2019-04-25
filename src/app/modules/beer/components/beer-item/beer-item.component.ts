import {Component, Input, OnInit} from '@angular/core';
import {BeerService} from '../../shared/beer.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-beer-item',
  templateUrl: './beer-item.component.html',
  styles: []
})
export class BeerItemComponent implements OnInit {

  @Input() item: any;
  @Input() index: number;
  environment = environment;

  constructor(private bierenService: BeerService) { }

  ngOnInit() {
  }

}
