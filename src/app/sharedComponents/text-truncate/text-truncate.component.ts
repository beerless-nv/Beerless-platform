import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-text-truncate',
    templateUrl: './text-truncate.component.html',
    styles: []
})
export class TextTruncateComponent implements OnInit {

    @Input() text: string;
    @Input() limit: number;
    @Input() truncateSymbol: string;
    @Input() truncateText: string;
    show = false;

    constructor() {
    }

    ngOnInit() {
    }

}
