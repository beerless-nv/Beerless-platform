import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {ChatbotService} from '../../../_services/chatbot.service';
import {ChatbotComponent} from '../chatbot.component';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styles: []
})
export class MessagesComponent implements OnInit {

    @Input() delay: number;
    @Input() messageObject: Object;
    showTypingIndicator = true;
    showQuickReplies = false;

    constructor(private chatbotService: ChatbotService, private chatbotComponent: ChatbotComponent) {

    }

    ngOnInit() {
        if (this.messageObject['oldMessages'] === true) {
            this.showTypingIndicator = false;
            this.delay = 0;
            // this.showQuickReplies = false;
        } else {
            setTimeout(() => {
                this.showTypingIndicator = false;
            }, Number(this.delay * this.messageObject['messages'].length));

            setTimeout(() => {
                this.showQuickReplies = true;
            }, Number(this.delay * this.messageObject['messages'].length));
        }
    }

    sendMessage(quickReply) {
        this.showQuickReplies = false;
        this.chatbotService.sendMessage(quickReply);
    }

}
