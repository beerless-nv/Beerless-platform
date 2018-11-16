import {Component, Input, OnInit} from '@angular/core';
import {BeersService} from '../../../../../services/beers.service';


@Component({
  selector: 'app-beer-item',
  templateUrl: './beer-item.component.html',
  styles: []
})
export class BeerItemComponent implements OnInit {

  @Input() item: any;
  @Input() index: number;

  constructor(private bierenService: BeersService) { }

  ngOnInit() {
  }

}
