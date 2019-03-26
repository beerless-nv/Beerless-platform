import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-beerbreweryprofile',
    templateUrl: './beerbreweryprofile.component.html',
    styles: []
})
export class BeerbreweryprofileComponent implements OnInit {
    environment = environment;
    @Input() item: any;

    constructor() {
    }

    ngOnInit() {
    }

}
