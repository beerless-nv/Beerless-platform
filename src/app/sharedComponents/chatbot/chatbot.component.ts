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
import {EmoticonsComponent} from './extra/emoticons/emoticons.component';

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
    // @ViewChild('emoticonsComponent') emoticonsComponent: EmoticonsComponent;

    // extra modal components
    showEmoticons = false;
    showUpload = false;

    messages = new BehaviorSubject<Array<any>>(null);

    messageDelay = 1500;
    sessionDelay = 0;
    delay = this.messageDelay;

    selectedText;

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

            setTimeout(() => {
                this.delay = this.messageDelay;
            }, 2000);
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

        // this.delay = this.messageDelay;
    }

    getSelectedText() {
        if (window.getSelection) {
            this.selectedText = window.getSelection().toString();
        }
    }

    getCaretPosition() {
        let caretPos = 0,
            sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                if (range.commonAncestorContainer.parentNode === this.chatbotInput.nativeElement) {
                    caretPos = range.endOffset;
                }
            }
        }
        return caretPos;
    }

    replaceTextWithEmoticon(text) {
        text = text.replace('&nbsp;', '');
        const wordArray = text.split(' ').map(value => value.replace('&nbsp;', '')).filter(replacedValue => replacedValue !== '');
        const wordArrayLowercase = wordArray.map(value => value.toLowerCase());

        for (const emojisKey in this.chatbotService.emojis) {
            const emojiCode = this.chatbotService.emojis[emojisKey];
            const index = wordArrayLowercase.indexOf(emojiCode.toLowerCase());

            if (index > -1) {
                // get caret position
                const caretPosition = this.getCaretPosition() - emojiCode.length + 2;

                // replace shortcodes with emoji
                this.chatbotInput.nativeElement.innerHTML = this.chatbotInput.nativeElement.innerHTML.replace(wordArray[index], emojisKey);

                // set caret
                const range = document.createRange();
                const selection = window.getSelection();
                range.setStart(this.chatbotInput.nativeElement.childNodes[0], caretPosition);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
                this.chatbotInput.nativeElement.focus();
            }
        }
    }

    scrollToBottom(): void {
        try {
            this.chatbotContent.nativeElement.scrollTop = this.chatbotContent.nativeElement.scrollHeight;
        } catch (err) {
        }
    }
}
