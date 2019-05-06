import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-brewery-location',
    templateUrl: './brewery-location.component.html',
    styles: []
})
export class BreweryLocationComponent implements OnInit, OnChanges {

    @Input() streetAndNumber: string;
    @Input() place: string;
    @Input() postcode: string;
    @Input() province: string;
    @Input() country: string;
    query: string;
    src: string;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.query = '';
        if (this.streetAndNumber) {
            this.query += ' ' + this.streetAndNumber;
        }
        if (this.place) {
            this.query += ' ' + this.place;
        }
        if (this.postcode) {
            this.query += ' ' + this.postcode;
        }
        if (this.province) {
            this.query += ' ' + this.province;
        }
        if (this.country) {
            this.query += ' ' + this.country;
        }

        if (this.query) {
            this.src = 'https://www.google.com/maps/embed/v1/place?key=' + environment.mapsAPIKey + '&q=' + this.query;
        }
    }

}
