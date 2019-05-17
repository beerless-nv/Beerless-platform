import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-cookie-setter',
    templateUrl: './cookie-setter.component.html',
    styles: []
})
export class CookieSetterComponent implements OnInit {

    constructor(private route: ActivatedRoute) {
        route.queryParams.subscribe(params => {
            console.log(params);
            if (params['cookie'] && params['redirectUrl']) {
                document.cookie = params['cookie'];
                document.location = params['redirectUrl'];
            }
        });
    }

    ngOnInit() {

    }
}
