import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-profile-personal',
    templateUrl: './profile-personal.component.html',
    styles: []
})
export class ProfilePersonalComponent implements OnInit {

    @Input() user: any;

    limit = 200;
    moreShown = false;

    constructor() {
    }

    ngOnInit() {
    }

}
