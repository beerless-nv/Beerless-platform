import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ChatbotService} from '../chatbot.service';
import {BehaviorSubject} from 'rxjs';
import ResizeObserver from 'resize-observer-polyfill';
import {AuthService} from '../../../../core/authorization/auth.service';
import {NgScrollbar} from 'ngx-scrollbar';

@Component({
    selector: 'beerless-chatbot',
    templateUrl: './chatbot.component.html',
    styles: []
})
export class ChatbotComponent implements OnInit {

    chatbotShow = false;
    showScrollbar = false;
    showExtra = false;
    showOldMessages = false;
    messagesArray: Array<any> = null;
    scrollEnabled = true;
    isNewSession;
    hideStartMessage = false;

    @ViewChild('chatbotInput') chatbotInput: ElementRef;
    @ViewChild('chatbotBody') chatbotBody: ElementRef;
    @ViewChild('chatbotContent') chatbotContent: ElementRef;
    @ViewChild(NgScrollbar) scrollRef: NgScrollbar;

    // extra modal components
    showEmoticons = false;
    showUpload = false;

    messages = new BehaviorSubject<Array<any>>(null);

    delay = 1500;

    selectedText;

    scrollbar;

    constructor(private cookieService: CookieService, private chatbotService: ChatbotService, private cdref: ChangeDetectorRef, private authService: AuthService) {
    }

    ngOnInit() {
        // hide scrollbar
        this.hideScrollbar(document.querySelector('.no-scrollbar'));

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

    openExtra() {
        this.showExtra = true;
    }

    closeExtra() {
        this.showExtra = false;
    }

    sendMessage(message) {
        this.hideStartMessage = true;

        this.chatbotService.sendMessage(message);
    }

    async showOlderMessages() {
        const heightBefore = this.chatbotContent.nativeElement.scrollHeight;
        const scrollTop = this.chatbotContent.nativeElement.scrollTop;
        let heightAfter;

        // disable scroll
        this.scrollEnabled = false;

        // show older messages
        this.chatbotService.getSession().then(data => {
            this.showOldMessages = true;

            // resize observer of chatbot body content
            const resizeObserver = new ResizeObserver((entries, observer) => {
                for (const entry of entries) {
                    heightAfter = this.chatbotContent.nativeElement.scrollHeight;

                    this.chatbotContent.nativeElement.scrollTop = heightAfter - heightBefore + scrollTop;
                }
            });
            resizeObserver.observe(this.chatbotBody.nativeElement);
        });
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

    hideScrollbar(child) {
        function getScrollbarWidth() {
            const outer = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.width = '100px';
            outer.style.msOverflowStyle = 'scrollbar';

            document.body.appendChild(outer);

            const widthNoScroll = outer.offsetWidth;
            // force scrollbars
            outer.style.overflow = 'scroll';

            // add innerdiv
            const inner = document.createElement('div');
            inner.style.width = '100%';
            outer.appendChild(inner);

            const widthWithScroll = inner.offsetWidth;

            // remove divs
            outer.parentNode.removeChild(outer);

            return widthNoScroll - widthWithScroll;
        }

        child.style.width = 'calc(100% - 100px + ' + getScrollbarWidth() + 'px)';
    }
}
