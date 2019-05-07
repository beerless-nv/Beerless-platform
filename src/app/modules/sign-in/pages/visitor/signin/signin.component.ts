import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styles: []
})
export class SigninComponent implements OnInit {

    constructor(private router: Router) {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        if (accessToken) {
            router.navigate(['']);
        }
    }

    ngOnInit() {
    }


}
