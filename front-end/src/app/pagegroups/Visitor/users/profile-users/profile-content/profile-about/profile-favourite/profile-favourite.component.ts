import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-profile-favourite',
    templateUrl: './profile-favourite.component.html',
    styles: []
})
export class ProfileFavouriteComponent implements OnInit {

    @Input() user: any;

    constructor() {
    }

    ngOnInit() {
    }

}
