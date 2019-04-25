import {Component, OnInit, Input} from '@angular/core';
import {environment} from '../../../../../environments/environment.prod';

@Component({
    selector: 'app-article-item',
    templateUrl: './article-item.component.html'
})
export class ArticleItemComponent implements OnInit {

    @Input() user: any;
    @Input() article: any;
    picture;
    environment = environment;


    constructor() {
    }

    ngOnInit() {
    }

}
