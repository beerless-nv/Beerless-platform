import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';

@Component({
    selector: 'app-profile-stats',
    templateUrl: './profile-stats.component.html',
    styles: []
})
export class ProfileStatsComponent implements OnInit {

    @Input() user: any;
    environment = environment;

    constructor() {
    }

    ngOnInit() {
    }

}
