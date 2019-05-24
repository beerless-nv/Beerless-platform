import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-beerbreweryprofile',
    templateUrl: './beerbreweryprofile.component.html',
    styles: []
})
export class BeerbreweryprofileComponent implements OnInit {

    @Input() item: any;
    logo: string;

    constructor() {
    }

    ngOnInit() {
        this.logo = environment.imageURL + '/breweries/logo/' + this.item.logo;
    }

}
