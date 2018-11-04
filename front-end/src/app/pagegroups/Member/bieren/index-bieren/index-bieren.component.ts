import { Component, OnInit } from '@angular/core';
import {BierenService} from '../../../../services/bieren.service';

@Component({
  selector: 'app-index-bieren',
  templateUrl: './index-bieren.component.html',
  styleUrls: []
})
export class IndexBierenComponent implements OnInit {

    bierenList: { name: string, brewery: string, style: string, image: string }[];

    constructor(private bierenService: BierenService) {    }

    ngOnInit() {
        this.bierenList = this.bierenService.bierenList;
    }
}
