import {Component, Input, OnInit} from '@angular/core';
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

    constructor(private beersService: BeersService, private route: ActivatedRoute, private router: Router) {
        router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                if (e.url.includes('embed')) {
                    this.loadItem();
                }
            }
        });
    }

    ngOnInit() {
    }

    loadItem() {
        this.route.params.subscribe(params => {
            this.beersService.getBeerById(params['id'])
                .then(data => {
                    this.item = data;
                });
        });
    }
}
