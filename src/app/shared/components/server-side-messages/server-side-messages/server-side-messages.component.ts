import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'beerless-server-side-messages',
    templateUrl: './server-side-messages.component.html',
    styleUrls: ['./server-side-messages.component.scss']
})
export class ServerSideMessagesComponent implements OnInit {

    @Input() messages: any;

    constructor() {
    }

    ngOnInit() {
    }

}
