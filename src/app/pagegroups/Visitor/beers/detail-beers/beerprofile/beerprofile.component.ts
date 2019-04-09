import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {BeersService} from '../../../../../_services/beers.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

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

    constructor(private beersService: BeersService, private route: ActivatedRoute, private router: Router, private elm: ElementRef) {
    }

    ngOnInit() {
        const itemId = this.elm.nativeElement.getAttribute('item');
        if (!isNaN(itemId)) {
            this.beersService.getBeerById(itemId)
                .then(data => {
                    this.item = data;
                });
        }
    }
}
