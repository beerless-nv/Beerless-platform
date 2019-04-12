import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ChatbotService} from '../../_services/chatbot.service';
import {BehaviorSubject} from 'rxjs';
import ResizeObserver from 'resize-observer-polyfill';
import {AuthService} from '../../_services/authorization/auth.service';

@Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.component.html',
    styles: []
})
export class ChatbotComponent implements OnInit {

    chatbotShow = false;
    showScrollbar = false;
    showExtra = false;
    showOldMessages = false;
    messagesArray = [];
    scrollEnabled = true;
    isNewSession;

    @ViewChild('chatbotInput') chatbotInput: ElementRef;
    @ViewChild('chatbotBody') chatbotBody: ElementRef;
    @ViewChild('chatbotContent') chatbotContent: ElementRef;

    // extra modal components
    showEmoticons = false;
    showUpload = false;

    messages = new BehaviorSubject<Array<any>>(null);

    delay = 1500;

    selectedText;

    constructor(private cookieService: CookieService, private chatbotService: ChatbotService, private cdref: ChangeDetectorRef, private authService: AuthService) {
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

        // const isNew = this.chatbotService.setSession();
        this.chatbotService.setSession();

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

        this.isNewSession = this.chatbotService.isNewSession;
    }

    close() {
        this.chatbotShow = false;

        // hide scrollbar
        this.showScrollbar = false;

        // stop stream when closing chatbot
        if (!this.chatbotService.takeoverSession) {
            setTimeout(() => {
                this.chatbotService.closeChatStream();
            }, 300);
        }
    }

    sendMessage(message) {
        this.chatbotService.sendMessage(message);

        // this.delay = this.messageDelay;
    }

    showOlderMessages() {
        this.authService.isAuthenticated();
        const heightBefore = this.chatbotContent.nativeElement.scrollHeight;
        let heightAfter;

        // disable scroll
        this.scrollEnabled = false;

        // show older messages
        this.showOldMessages = true;

        // resize observer of chatbot body content
        const resizeObserver = new ResizeObserver((entries, observer) => {
            for (const entry of entries) {
                heightAfter = this.chatbotContent.nativeElement.scrollHeight;
                this.chatbotContent.nativeElement.scrollTop = heightAfter - heightBefore + this.chatbotContent.nativeElement.scrollTop;
            }
        });
        resizeObserver.observe(this.chatbotBody.nativeElement);
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
        if (this.scrollEnabled) {
            try {
                this.chatbotContent.nativeElement.scrollTop = this.chatbotContent.nativeElement.scrollHeight;
            } catch (err) {
            }
        }
    }

    preserveScrollPosition(): void {
        const heightBefore = this.chatbotContent.nativeElement.scrollHeight;
    }
}
