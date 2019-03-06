import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-regular-menu-item',
    templateUrl: './regular-menu-item.component.html',
    styles: []
})
export class RegularMenuItemComponent implements OnInit {

    @Input() menuItem: any;

    constructor() {
    }

    ngOnInit() {
    }

}
