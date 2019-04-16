import {Component, OnInit} from '@angular/core';
import {ChatbotComponent} from '../../chatbot.component';
import {ChatbotService} from '../../../../_services/chatbot/chatbot.service';

@Component({
    selector: 'app-emoticons',
    templateUrl: './emoticons.component.html',
    styles: []
})
export class EmoticonsComponent implements OnInit {

    emojis = this.chatbotService.emojis;

    constructor(private chatbotComponent: ChatbotComponent, private chatbotService: ChatbotService) {
    }

    ngOnInit() {
    }

    appendEmoji(emoji) {
        if (this.chatbotComponent.selectedText) {
            console.log(this.chatbotComponent.selectedText);
            const newString = this.chatbotComponent.chatbotInput.nativeElement.innerHTML.replace(this.chatbotComponent.selectedText, emoji);
            this.chatbotComponent.chatbotInput.nativeElement.innerHTML = newString;
        } else {
            this.chatbotComponent.chatbotInput.nativeElement.innerHTML += emoji;
        }
    }

    returnOrder() {
        return 0;
    }

}
