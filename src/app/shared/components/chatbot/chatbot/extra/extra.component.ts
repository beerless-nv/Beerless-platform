import {Component, OnInit, ViewChild} from '@angular/core';
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
        // open extra modal
        this.chatbotComponent.openExtra();

        // display emoticons
        this.chatbotComponent.showEmoticons = true;

        // hide other modals
        this.chatbotComponent.showUpload = false;
    }

    openUpload() {
        // open extra modal
        this.chatbotComponent.openExtra();

        // display emoticons
        this.chatbotComponent.showUpload = true;

        // hide other modals
        this.chatbotComponent.showEmoticons = false;
    }

}
