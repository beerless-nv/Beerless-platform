import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: []
})
export class MessageComponent implements OnInit {

    @Input() delay: number;
    @Input() messageIndex: number;
    @Input() type: string;
    @Input() message: string;
    showMessageItem = false;
    showMessage = false;

    constructor() {

    }

    ngOnInit() {
        console.log('message ' + this.messageIndex, (this.delay * this.messageIndex) + this.delay);

        if (this.type !== 'user') {
            setTimeout(() => {
                this.showMessage = true;
            }, Number((this.delay * this.messageIndex) + this.delay));
        } else {
            this.showMessageItem = true;
            this.showMessage = true;
        }
    }
}
