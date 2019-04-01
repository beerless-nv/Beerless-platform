import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Guid} from 'guid-typescript';
import {ChatbotService} from '../../_services/chatbot.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.component.html',
    styles: []
})
export class ChatbotComponent implements OnInit {

    chatbotShow: boolean = null;
    messagesArray = [];

    constructor(private cookieService: CookieService, private chatbotService: ChatbotService) {
    }

    ngOnInit() {
        this.chatbotService.messages.subscribe(data => {
            this.messagesArray = data;
            console.log(this.messagesArray);
        });
    }

    open() {
        this.chatbotService.setSession();

        this.chatbotShow = !this.chatbotShow;
    }

    sendMessage(message) {
        console.log(message);
        this.chatbotService.sendMessage(message);
    }
}
