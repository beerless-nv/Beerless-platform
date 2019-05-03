import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';

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

    constructor(private elm: ElementRef) {
    }

    ngOnInit() {
        if (this.elm.nativeElement.getAttribute('item') !== null) {
            this.item = JSON.parse(this.elm.nativeElement.getAttribute('item'));
        }
    }
}
