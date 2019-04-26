import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {BeerService} from '../../../../modules/beer/shared/beer.service';
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

    constructor(private beersService: BeerService, private route: ActivatedRoute, private router: Router, private elm: ElementRef) {
    }

    ngOnInit() {
        if (this.elm.nativeElement.getAttribute('item') !== null) {
            this.item = JSON.parse(this.elm.nativeElement.getAttribute('item'));
        }
    }
}
