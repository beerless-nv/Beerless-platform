import {Component, Inject, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-profile-content',
    templateUrl: './profile-content.component.html',
    styles: []
})
export class ProfileContentComponent implements OnInit {

    @Input() user: any;

    constructor() {
    }

    ngOnInit() {
    }

}
