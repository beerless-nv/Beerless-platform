import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-profile-sidebar',
    templateUrl: './profile-sidebar.component.html',
    styles: []
})
export class ProfileSidebarComponent implements OnInit {

    @Input() user: any;

    sidebarSticky = false;
    limit = 120;
    moreShown = false;

    constructor() {
    }

    ngOnInit() {
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.sidebarSticky = window.pageYOffset > 80;
    }

}
