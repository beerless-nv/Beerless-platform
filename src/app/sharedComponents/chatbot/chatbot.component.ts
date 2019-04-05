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

@Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.component.html',
    styles: []
})
export class ChatbotComponent implements OnInit, AfterViewChecked {

    chatbotShow: boolean = null;
    showScrollbar = false;
    messagesArray = [];

    @ViewChild('chatbotInput') chatbotInput: ElementRef;
    @ViewChild('chatbotBoxBody') chatbotBoxBody: ElementRef;
    @ViewChild('chatbotContent') chatbotContent: ElementRef;

    messages = new BehaviorSubject<Array<any>>(null);

    constructor(private cookieService: CookieService, private chatbotService: ChatbotService, private cdref: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.chatbotService.messages.subscribe(data => {
            this.messagesArray = data;
            // console.log(this.cdref.detectChanges());
            // console.log('OBSERVABLE', data);
        });
    }

    ngAfterViewChecked() {
        // console.log('change');
    //     scroll to bottom
    //     this.scrollToBottom();
    }

    open() {
        this.chatbotShow = !this.chatbotShow;

        if (this.chatbotShow === true) {
            // set session and start stream when opening chatbot
            this.chatbotService.setSession();

            // focus on input
            setTimeout(() => {
                this.chatbotInput.nativeElement.focus();
                this.showScrollbar = true;
            }, 800);

            // scroll to bottom
            this.scrollToBottom();
        } else {
            // hide scrollbar
            this.showScrollbar = false;

            // stop stream when closing chatbot
            this.chatbotService.closeChatStream();
        }
    }

    sendMessage(message) {
        // console.log(messages);

        this.chatbotService.sendMessage(message);

        // scroll to bottom
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.chatbotContent.nativeElement.scrollTop = this.chatbotContent.nativeElement.scrollHeight;
        } catch (err) {
        }
    }
}
