import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {ChatbotService} from '../../../_services/chatbot.service';

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

    constructor(private chatbotService: ChatbotService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.showTypingIndicator = false;
        }, Number(this.delay * this.messageObject['messages'].length));

        setTimeout(() => {
            this.showQuickReplies = true;
        }, Number(this.delay * this.messageObject['messages'].length));
    }

    sendMessage(quickReply) {
        this.showQuickReplies = false;
        this.chatbotService.sendMessage(quickReply);
    }

}
