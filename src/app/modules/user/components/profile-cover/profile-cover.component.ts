import {Component, HostListener, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-profile-cover',
    templateUrl: './profile-cover.component.html',
    styles: []
})
export class ProfileCoverComponent implements OnInit {

    @Input() user: any;

    environment = environment;
    coverTopMargin = false;

    constructor() {
    }

    ngOnInit() {
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (window.innerWidth > 992) {
            this.coverTopMargin = window.pageYOffset > 180;
        } else {
            this.coverTopMargin = window.pageYOffset > 30;
        }
    }
}
