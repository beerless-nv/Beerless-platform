import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styles: []
})
export class MessagesComponent implements OnInit {

    @Input() delay: number;
    // @Input() type: string;
    @Input() messageObject: Object;
    showMessage = false;

    constructor() {
        // setTimeout(() => {
        //     this.showMessage = true;
        //     console.log(this.showMessage);
        //     console.log(this.messageObject);
        // }, 5000);
    }

    ngOnInit() {
        console.log(this.delay, this.messageObject);
        setTimeout(() => {
            this.showMessage = true;
        }, Number(this.delay * this.messageObject['messages'].length));
    }

}
