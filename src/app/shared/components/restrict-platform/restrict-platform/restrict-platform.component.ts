import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-restrict-platform',
    templateUrl: './restrict-platform.component.html',
    styleUrls: ['./restrict-platform.component.scss']
})
export class RestrictPlatformComponent implements OnInit {

    appUrl = environment.websiteURL;

    constructor() {
    }

    ngOnInit() {
    }

}
