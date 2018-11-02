import {Component, OnInit} from '@angular/core';
import {BierenService} from '../services/bieren.service';

@Component({
    selector: 'app-bieren',
    templateUrl: './bieren.component.html',
    styles: []
})
export class BierenComponent implements OnInit {

    bierenList: { name: string, brewery: string, style: string, image: string }[];

    constructor(private bierenService: BierenService) {    }

    ngOnInit() {
        this.bierenList = this.bierenService.bierenList;
    }

}
