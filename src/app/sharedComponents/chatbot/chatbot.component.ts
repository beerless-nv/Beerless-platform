import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren} from '@angular/core';
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
    showScrollbar = false;
    messagesArray = [];
    @ViewChild('chatbotInput') chatbotInput: ElementRef;
    @ViewChild('chatbotBoxBody') chatbotBoxBody: ElementRef;

    constructor(private cookieService: CookieService, private chatbotService: ChatbotService, private rd: Renderer2) {
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

        // focus on input
        if (this.chatbotShow === true) {
            setTimeout(() => {
                this.chatbotInput.nativeElement.focus();
                this.showScrollbar = true;
            }, 800);
        } else {
            this.showScrollbar = false;
        }
    }

    sendMessage(message) {
        console.log(message);
        this.chatbotService.sendMessage(message);
    }
}
