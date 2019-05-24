import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BeerService} from '../../../beer/shared/beer.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styles: []
})
export class SearchItemComponent implements OnInit, OnChanges {

  @Input() item: any;
  @Input() index: number;
  content;
  type;
  environment = environment;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.content = this.item._source;
      this.type = this.item._index;
  }

}
