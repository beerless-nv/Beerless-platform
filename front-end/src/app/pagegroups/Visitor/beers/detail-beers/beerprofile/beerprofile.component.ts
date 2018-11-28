import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-beerprofile',
    templateUrl: './beerprofile.component.html',
    styles: []
})
export class BeerprofileComponent implements OnInit {
    environment = environment;
    @Input() item: any;
    limit = 210;
    moreShown = false;

    constructor() {
    }

    ngOnInit() {
    }

}
