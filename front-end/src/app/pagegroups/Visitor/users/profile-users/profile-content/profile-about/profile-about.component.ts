import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-profile-about',
    templateUrl: './profile-about.component.html',
    styles: []
})
export class ProfileAboutComponent implements OnInit {

    @Input() user: any;

    constructor() {
    }

    ngOnInit() {
    }

}
