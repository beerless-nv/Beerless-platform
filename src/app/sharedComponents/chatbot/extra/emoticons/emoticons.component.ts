import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-emoticons',
    templateUrl: './emoticons.component.html',
    styles: []
})
export class EmoticonsComponent implements OnInit {

    emojis = ['&#x1f602', '&#x1F604', '&#x1F34A', '&#x1F344', '&#x1F37F', '&#x1F363', '&#x1F370', '&#x1F355',
        '&#x1F354', '&#x1F35F', '&#x1F6C0', '&#x1F48E', '&#x1F5FA', '&#x123F0', '&#x1F579', '&#x1F4DA',
        '&#x1F431', '&#x1F42A', '&#x1F439', '&#x1F424'];

    constructor() {
    }

    ngOnInit() {
    }

}
