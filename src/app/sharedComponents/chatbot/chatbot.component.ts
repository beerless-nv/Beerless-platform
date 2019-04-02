import {
    AfterViewChecked,
    AfterViewInit,
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

    // helperArray = [];

    chatbotMessages = new BehaviorSubject<Object>([]);
    @ViewChild('chatbotInput') chatbotInput: ElementRef;
    @ViewChild('chatbotBoxBody') chatbotBoxBody: ElementRef;
    @ViewChild('chatbotContent') chatbotContent: ElementRef;

    messages = new BehaviorSubject<Array<any>>(null);

    constructor(private cookieService: CookieService, private chatbotService: ChatbotService, private rd: Renderer2) {

    }

    ngOnInit() {
        this.chatbotService.messages.subscribe(data => {
            this.messagesArray = data;
        });
    }

    ngAfterViewChecked() {
        // scroll to bottom
        this.scrollToBottom();
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

        // scroll to bottom
        this.scrollToBottom();
    }

    sendMessage(message) {
        // console.log(messages);

        this.chatbotService.sendMessage(message);

        // scroll to bottom
        this.scrollToBottom();
    }

    // getMessage(data: Observable<any>) {
    //     // for (let i = 0; i < data['data'].length; i++) {
    //     //     // this.delayIncommingMessages(i);
    //     //
    //     //     setTimeout(() => {
    //     //         this.messagesArray.push({'type': 'chatbot', 'messages': data['data'][i].messages});
    //     //         this.messages.next(this.messagesArray);
    //     //         // console.log('messagesArray', this.messagesArray);
    //     //         // console.log('index', i);
    //     //     }, 1500);
    //     // }
    //
    //     console.log(data);
    //
    //     // data.subscribe(resp => {
    //     //     console.log(resp);
    //     // });
    //
    //
    //      data.subscribe(((response) => {
    //         const messages = response.data;
    //
    //         messages.map((messages) => {
    //             const newMessage = {type: 'chatbot', messages: messages['messages']};
    //                 this.helperArray.push(newMessage);
    //                 this.messagesArray = of(this.helperArray).pipe(delay(1000));
    //                 console.log(this.helperArray);
    //                 console.log(newMessage);
    //             return newMessage;
    //         });
    //     }));
    //
    // }

    scrollToBottom(): void {
        try {
            this.chatbotContent.nativeElement.scrollTop = this.chatbotContent.nativeElement.scrollHeight;
        } catch (err) {
        }
    }
}
