import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-signin-form',
    templateUrl: './signin-form.component.html',
    styles: []
})
export class SigninFormComponent implements OnInit {

    showRemembered = false;

    constructor(private router: Router, private route: ActivatedRoute) {
        route.queryParams.subscribe(params => {
            this.showRemembered = !!params['remembered'];
        });
    }

    ngOnInit() {
    }

}
