import {Component, Input, OnInit} from '@angular/core';
import {BeersService} from '../../../../../services/beers.service';


@Component({
    selector: 'app-beers-sidebar',
    templateUrl: './beers-sidebar.component.html',
    styleUrls: []
})
export class BeersSidebarComponent implements OnInit {

    @Input() item: any;
    @Input() index: number;

    constructor(private beersService: BeersService) {
    }

    ngOnInit() {
    }

}
