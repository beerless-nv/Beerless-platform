import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-beer-recommendations',
    templateUrl: './beer-recommendations.component.html',
    styles: []
})
export class BeerRecommendationsComponent implements OnInit {

    @Input() item: any;
    environment = environment;

    constructor() {
    }

    ngOnInit() {
    }

}
