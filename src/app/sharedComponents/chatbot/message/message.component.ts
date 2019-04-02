import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: []
})
export class MessageComponent implements OnInit {

    @Input() delay: number;
    @Input() type: string;
    @Input() message: string;
    showMessage = false;

    constructor() {

    }

    ngOnInit() {
        if (this.type !== 'user') {
            setTimeout(() => {
                this.showMessage = true;
            }, Number(this.delay));
        } else {
            this.showMessage = true;
        }
    }

}
