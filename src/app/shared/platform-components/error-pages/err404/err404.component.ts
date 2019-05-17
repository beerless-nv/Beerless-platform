import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-err404',
    templateUrl: './err404.component.html',
    styleUrls: ['./err404.component.scss']
})
export class Err404Component implements OnInit {

    constructor(private location: Location) {
    }

    ngOnInit() {
    }

    goBack() {
        this.location.back();
    }

}
