import {
    AfterContentChecked,
    AfterViewChecked,
    AfterViewInit, ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Guid} from 'guid-typescript';
import {ChatbotService} from '../../_services/chatbot.service';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import ResizeObserver from 'resize-observer-polyfill';

@Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.component.html',
    styles: []
})
export class ChatbotComponent implements OnInit {

    chatbotShow = false;
    showScrollbar = false;
    showExtra = false;
    messagesArray = [];

    @ViewChild('chatbotInput') chatbotInput: ElementRef;
    @ViewChild('chatbotBody') chatbotBody: ElementRef;
    @ViewChild('chatbotContent') chatbotContent: ElementRef;

    messages = new BehaviorSubject<Array<any>>(null);

    messageDelay = 1500;
    sessionDelay = 0;
    delay = this.messageDelay;

    constructor(private cookieService: CookieService, private chatbotService: ChatbotService, private cdref: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.chatbotService.messages.subscribe(data => {
            this.messagesArray = data;
        });
    }

    toggle() {
        if (this.chatbotShow === false) {
            this.open();
        } else {
            this.close();
        }

    }

    open() {
        this.chatbotShow = true;

        const isNew = this.chatbotService.setSession();

        if (isNew === false) {
            this.chatbotService.getSession();
            this.delay = this.sessionDelay;
        }

        // focus on input
        setTimeout(() => {
            this.chatbotInput.nativeElement.focus();
            this.showScrollbar = true;
        }, 800);

        // resize observer of chatbot body content
        const resizeObserver = new ResizeObserver((entries, observer) => {
            for (const entry of entries) {
                this.scrollToBottom();
            }
        });
        resizeObserver.observe(this.chatbotBody.nativeElement);
    }

    close() {
        this.chatbotShow = false;

        // hide scrollbar
        this.showScrollbar = false;

        // stop stream when closing chatbot
        this.chatbotService.closeChatStream();
    }

    sendMessage(message) {
        this.chatbotService.sendMessage(message);

        this.delay = this.messageDelay;
    }

    scrollToBottom(): void {
        try {
            this.chatbotContent.nativeElement.scrollTop = this.chatbotContent.nativeElement.scrollHeight;
        } catch (err) {
        }
    }
}
