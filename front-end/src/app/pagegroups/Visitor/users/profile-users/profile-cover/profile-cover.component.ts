import {Component, HostListener, Input, OnInit} from '@angular/core';
import {User} from '../../../../../_interfaces/user';

@Component({
    selector: 'app-profile-cover',
    templateUrl: './profile-cover.component.html',
    styles: []
})
export class ProfileCoverComponent implements OnInit {

    @Input() user: any;

    backgroundPictureSrc = './src/assets/images/home_hero_extended.jpg';
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
