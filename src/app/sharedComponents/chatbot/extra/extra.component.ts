import {Component, OnInit} from '@angular/core';
import {ChatbotComponent} from '../chatbot.component';

@Component({
    selector: 'app-extra',
    templateUrl: './extra.component.html',
    styles: []
})
export class ExtraComponent implements OnInit {

    constructor(private chatbotComponent: ChatbotComponent) {
    }

    ngOnInit() {
    }

    openEmoticons() {
        this.chatbotComponent.showExtra = !this.chatbotComponent.showExtra;
    }

}
