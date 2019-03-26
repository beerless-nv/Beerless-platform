import {Component, OnInit, Input} from '@angular/core';
import {environment} from '../../../../../../environments/environment';

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
        // this.picture = this.user.picture || 'https://avatars.dicebear.com/v2/identicon/' + this.user.firstname + this.user.lastname + '.svg';
    }

}
