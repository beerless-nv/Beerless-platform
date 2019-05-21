import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';

@Component({
    selector: 'app-profile-favourite',
    templateUrl: './profile-favourite.component.html',
    styles: []
})
export class ProfileFavouriteComponent implements OnInit {

    @Input() user: any;
    environment = environment;

    constructor() {
    }

    ngOnInit() {
    }

}
