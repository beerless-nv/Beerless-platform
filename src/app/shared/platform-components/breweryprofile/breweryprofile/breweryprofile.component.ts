import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment.prod';

@Component({
    selector: 'app-breweryprofile',
    templateUrl: './breweryprofile.component.html',
    styles: []
})
export class BreweryprofileComponent implements OnInit {

    @Input() item: any;
    environment = environment;

    constructor(private elm: ElementRef) {
    }

    ngOnInit() {
        console.log(this.item);
        if (this.elm.nativeElement.getAttribute('item') !== null) {
            this.item = JSON.parse(this.elm.nativeElement.getAttribute('item'));
        }
    }

}
