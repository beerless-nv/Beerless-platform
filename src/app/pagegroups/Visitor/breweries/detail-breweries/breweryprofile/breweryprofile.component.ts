import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment.prod';

@Component({
    selector: 'app-breweryprofile',
    templateUrl: './breweryprofile.component.html',
    styles: []
})
export class BreweryprofileComponent implements OnInit {

    @Input() item: any;
    environment = environment;

    constructor(private cdref: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

}
