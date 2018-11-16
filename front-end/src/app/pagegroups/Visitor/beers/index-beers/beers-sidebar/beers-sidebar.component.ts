import {Component, Input, OnInit} from '@angular/core';
import {BeersService} from '../../../../../services/beers.service';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-beers-sidebar',
    templateUrl: './beers-sidebar.component.html',
    styleUrls: []
})
export class BeersSidebarComponent implements OnInit {

    @Input() item: any;
    @Input() index: number;
    environment = environment;

    constructor(private beersService: BeersService) {
    }

    ngOnInit() {
    }

}
