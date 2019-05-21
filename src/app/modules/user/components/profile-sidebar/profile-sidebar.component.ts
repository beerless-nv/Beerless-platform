import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-profile-sidebar',
    templateUrl: './profile-sidebar.component.html',
    styles: []
})
export class ProfileSidebarComponent implements OnInit, OnChanges {

    @Input() user: any;
    environment = environment;
    addressArray: Array<string> = [];

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.user) {
            for (const item of [this.user.place, this.user.province, this.user.country]) {
                if (item !== null && item !== 'null' && item) {
                    this.addressArray.push(item);
                }
            }
        }
    }
}
