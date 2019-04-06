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

    chatbotShow: boolean = null;
    showScrollbar = false;
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

    open() {
        this.chatbotShow = !this.chatbotShow;

        if (this.chatbotShow === true) {
            // set session and start stream when opening chatbot
            const isNew = this.chatbotService.setSession();

            if (isNew === false) {
                this.chatbotService.getSession();
                this.delay = this.sessionDelay;
                console.log('true');
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

            // scroll to bottom
            // this.scrollToBottom();
        } else {
            // hide scrollbar
            this.showScrollbar = false;

            // stop stream when closing chatbot
            this.chatbotService.closeChatStream();
        }
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
